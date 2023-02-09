const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { CinemaGroup: Entity } = require("../models");

const entityName = "cinemaGroup";
const cinemaGroupService = {
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

  create: async (dataNewEntities) => {
    try {
      if (dataNewEntities.length == 0) {
        throw new AppError(400, `Data cannot be empty`);
      }

      const newEntities = [];
      for (let index = 0; index < dataNewEntities.length; index++) {
        const newEntity = await Entity.create({
          ...dataNewEntities[index],
        });
        newEntities.push(newEntity);
      }

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

module.exports = cinemaGroupService;
