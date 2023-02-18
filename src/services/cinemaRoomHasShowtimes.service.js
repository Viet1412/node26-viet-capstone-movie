const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { CinemaRoomHasMovie: Entity } = require("../models");

const entityName = "cinemaRoomHasShowtime";
const cinemaRoomHasShowtimeService = {
  //secured services
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

  getEntityDetails: async (dataQuery) => {
    try {
      const entityDetails = await Entity.findOne({
        where: dataQuery,
      });
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
          [Op.or]: [
            { cinemaRoomId: { [Op.like]: `%${searchKeyWord}%` } },
            { movieId: { [Op.like]: `%${searchKeyWord}%` } },
            { showtimeId: { [Op.like]: `%${searchKeyWord}%` } },
          ],
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

  create: async (dataNewEntities) => {
    try {
      if (dataNewEntities.length == 0) {
        throw new AppError(400, `Data cannot be empty`);
      }

      for (let index = 0; index < dataNewEntities.length; index++) {
        let isExist = await Entity.findOne({
          where: {
            cinemaRoomId: dataNewEntities[index].cinemaRoomId,
            movieId: dataNewEntities[index].movieId,
            showtimeId: dataNewEntities[index].showtimeId,
          },
        });
        if (isExist) {
          throw new AppError(
            400,
            `${entityName} with id-<${dataNewEntities[index].cinemaRoomId}> already has this movie at showtime with id-<${dataNewEntities[index].showtimeId}>`
          );
        }
      }

      const newEntities = await Entity.bulkCreate(dataNewEntities);

      return newEntities;
    } catch (error) {
      throw error;
    }
  },

  delete: async (dataQuery) => {
    try {
      const entity = await Entity.findOne({
        where: dataQuery,
      });
      if (!entity) {
        throw new AppError(404, `${entityName} not found`);
      }

      await Entity.destroy({ where: dataQuery });

      return entity;
    } catch (error) {
      throw error;
    }
  },

  update: async (dataQuery, dataUpdateEntity) => {
    try {
      if (Object.keys(dataUpdateEntity).length == 0) {
        throw new AppError(400, `Nothing to update`);
      }

      const entity = await Entity.findOne({
        where: dataQuery,
      });
      if (!entity) {
        throw new AppError(404, `${entityName} not found`);
      }

      await Entity.update(dataUpdateEntity, { where: dataQuery });

      return await Entity.findOne({
        where: dataQuery,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = cinemaRoomHasShowtimeService;
