const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { CinemaSystem: Entity } = require("../models");

const entityName = "cinemaSystem";
const cinemaSystemService = {
  //public services
  getEntityList: async () => {
    try {
      const entityList = await Entity.findAll();
      if (!entityList.length) {
        throw new AppError(404, `No ${entityName} found`);
      }
      return entityList;
    } catch (error) {
      throw error;
    }
  },

  getEntityListPagination: async (pagination) => {
    try {
      const page = pagination.page * 1;
      const quantityPerPage = pagination.quantityPerPage * 1;

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        throw new AppError(404, `Pagination value must be larger than 0`);
      }

      const entityListPagination = await Entity.findAndCountAll({
        offset: (page - 1) * quantityPerPage,
        limit: quantityPerPage,
      });
      const { count, rows } = entityListPagination;

      if (!count) {
        throw new AppError(404, `No ${entityName} found`);
      }

      return {
        totalRecords: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        [`${entityName}ListPagination`]: rows.length
          ? rows
          : `Found no other ${entityName}s`,
      };
    } catch (error) {
      throw error;
    }
  },

  getEntityDetails: async (entityId) => {
    try {
      const entityDetails = await Entity.findByPk(entityId);
      if (entityDetails) {
        return entityDetails;
      }
      throw new AppError(404, `${entityName} not found`);
    } catch (error) {
      throw error;
    }
  },

  search: async (searchKeyWord, pagination) => {
    //make search service capable of being used with or without Pagination
    try {
      const page = pagination.page * 1;
      const quantityPerPage = pagination.quantityPerPage * 1;

      //check if user sends an invalid pagination value
      const offsetValue = page > 0 && (page - 1) * quantityPerPage;

      const foundEntities = await Entity.findAndCountAll({
        where: {
          [Op.or]: [{ name: { [Op.like]: `%${searchKeyWord}%` } }],
        },
        offset: offsetValue > 0 ? offsetValue : 0,
        limit: quantityPerPage > 0 ? quantityPerPage : 9999,
      });

      const { count, rows } = foundEntities;

      if (!count) {
        throw new AppError(404, `No ${entityName} found`);
      }

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        return rows;
      }

      return {
        totalRecordsFound: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        [`${entityName}ListPagination`]: rows.length
          ? rows
          : `Found no other ${entityName}s`,
      };
    } catch (error) {
      throw error;
    }
  },

  getCinemaGroupsOfCinemaSystems: async () => {
    try {
      const entityList = await Entity.findAll({
        include: [
          {
            association: "hasCinemaGroups",
            attributes: {
              exclude: ["cinemaSystemId"],
            },
          },
        ],
      });
      if (!entityList.length) {
        throw new AppError(404, `No ${entityName} found`);
      }
      return entityList;
    } catch (error) {
      throw error;
    }
  },

  getCinemaGroupsOf1CinemaSystem: async (entityId) => {
    try {
      const cinemaGroupsOf1CinemaSystem = await Entity.findByPk(entityId, {
        include: [
          {
            association: "hasCinemaGroups",
            attributes: {
              exclude: ["cinemaSystemId"],
            },
          },
        ],
      });
      if (cinemaGroupsOf1CinemaSystem) {
        return cinemaGroupsOf1CinemaSystem;
      }
      throw new AppError(404, `${entityName} not found`);
    } catch (error) {
      throw error;
    }
  },

  getShowtimesOfCinemaSystems: async () => {
    try {
      const entityList = await Entity.findAll({
        include: [
          {
            association: "hasCinemaGroups",
            attributes: {
              exclude: ["cinemaSystemId"],
            },
            include: [
              {
                association: "hasCinemaRooms",
                required: true,
                attributes: {
                  exclude: ["cinemaGroupId"],
                },
                include: [
                  {
                    association: "hasMovies",
                    required: true,
                    through: {
                      as: "inCinema",
                      attributes: ["showStatus"],
                    },
                    include: [
                      {
                        association: "hasShowtimes",
                        through: {
                          attributes: [],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      if (!entityList.length) {
        throw new AppError(404, `No ${entityName} found`);
      }
      return entityList;
    } catch (error) {
      throw error;
    }
  },

  getShowtimesOf1CinemaSystem: async (entityId) => {
    try {
      const showtimesOf1CinemaSystem = await Entity.findByPk(entityId, {
        include: [
          {
            association: "hasCinemaGroups",
            attributes: {
              exclude: ["cinemaSystemId"],
            },
            include: [
              {
                association: "hasCinemaRooms",
                required: true,
                attributes: {
                  exclude: ["cinemaGroupId"],
                },
                include: [
                  {
                    association: "hasMovies",
                    required: true,
                    through: {
                      as: "inCinema",
                      attributes: ["showStatus"],
                    },
                    include: [
                      {
                        association: "hasShowtimes",
                        through: {
                          attributes: [],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      if (showtimesOf1CinemaSystem) {
        return showtimesOf1CinemaSystem;
      }
      throw new AppError(404, `${entityName} not found`);
    } catch (error) {
      throw error;
    }
  },

  //secured services
  create: async (dataNewEntities) => {
    try {
      if (dataNewEntities.length == 0) {
        throw new AppError(400, `Data cannot be empty`);
      }

      for (let index = 0; index < dataNewEntities.length; index++) {
        let isExist = await Entity.findOne({
          where: { name: dataNewEntities[index].name },
        });
        if (isExist) {
          throw new AppError(
            400,
            `${dataNewEntities[index].name} already exists`
          );
        }
      }

      const newEntities = await Entity.bulkCreate(dataNewEntities);

      return newEntities;
    } catch (error) {
      throw error;
    }
  },

  delete: async (entityId) => {
    try {
      const entity = await Entity.findByPk(entityId);
      if (!entity) {
        throw new AppError(404, `${entityName} not found`);
      }

      await Entity.destroy({ where: { id: entityId } });

      return entity;
    } catch (error) {
      throw error;
    }
  },

  update: async (entityId, dataUpdateEntity) => {
    try {
      if (Object.keys(dataUpdateEntity).length == 0) {
        throw new AppError(400, `Nothing to update`);
      }

      const entity = await Entity.findByPk(entityId);
      if (!entity) {
        throw new AppError(404, `${entityName} not found`);
      }

      //keep id unchanged
      dataUpdateEntity.id = entityId;

      await Entity.update(dataUpdateEntity, { where: { id: entityId } });

      return await Entity.findByPk(entityId);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = cinemaSystemService;
