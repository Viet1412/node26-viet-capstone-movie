const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { SeatName } = require("../models");

const seatNameService = {
  //public services
  getSeatNameList: async () => {
    try {
      const seatNameList = await SeatName.findAll();
      if (!seatNameList.length) {
        throw new AppError(404, "No SeatName found");
      }
      return seatNameList;
    } catch (error) {
      throw error;
    }
  },

  getSeatNameListPagination: async (pagination) => {
    try {
      const page = pagination.page * 1;
      const quantityPerPage = pagination.quantityPerPage * 1;

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        throw new AppError(404, "Pagination value must be larger than 0");
      }

      const seatNameListPagination = await SeatName.findAndCountAll({
        offset: (page - 1) * quantityPerPage,
        limit: quantityPerPage,
      });
      const { count, rows } = seatNameListPagination;

      if (!count) {
        throw new AppError(404, "No SeatName found");
      }

      return {
        totalRecords: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        seatNameListPagination: rows.length ? rows : "Found no more SeatNames",
      };
    } catch (error) {
      throw error;
    }
  },

  getSeatNameDetails: async (seatNameId) => {
    try {
      const seatNameDetails = await SeatName.findByPk(seatNameId); //include showing status
      if (seatNameDetails) {
        return seatNameDetails;
      }
      throw new AppError(404, "SeatName not found");
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

      const foundSeatNames = await SeatName.findAndCountAll({
        where: {
          [Op.or]: [{ name: { [Op.like]: `%${searchKeyWord}%` } }],
        },
        offset: offsetValue > 0 ? offsetValue : 0,
        limit: quantityPerPage > 0 ? quantityPerPage : 9999,
      });

      const { count, rows } = foundSeatNames;

      if (!count) {
        throw new AppError(404, "No SeatName found");
      }

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        return rows;
      }

      return {
        totalRecordsFound: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        SeatNameListPagination: rows.length ? rows : "Found no more SeatNames",
      };
    } catch (error) {
      throw error;
    }
  },

  //secured services
  create: async (dataNewSeatNames, requester) => {
    try {
      if (dataNewSeatNames.length == 0) {
        throw new AppError(400, "data cannot be empty");
      }

      const newSeatNames = [];
      for (let index = 0; index < dataNewSeatNames.length; index++) {
        const newSeatName = await SeatName.create({
          ...dataNewSeatNames[index],
        });
        newSeatNames.push(newSeatName);
      }

      return newSeatNames;
    } catch (error) {
      throw error;
    }
  },

  delete: async (seatNameId) => {
    try {
      const SeatName = await SeatName.findByPk(seatNameId);
      if (!SeatName) {
        throw new AppError(404, "SeatName not found");
      }

      await SeatName.destroy({ where: { id: seatNameId } });

      return SeatName;
    } catch (error) {
      throw error;
    }
  },

  update: async (seatNameId, dataUpdateSeatName) => {
    try {
      if (Object.keys(dataUpdateSeatName).length == 0) {
        throw new AppError(400, "Nothing to update");
      }

      const seatName = await SeatName.findByPk(seatNameId);
      if (!seatName) {
        throw new AppError(404, "SeatName not found");
      }

      //keep id unchanged
      dataUpdateSeatName.id = seatNameId;

      await SeatName.update(dataUpdateSeatName, { where: { id: seatNameId } });

      return await SeatName.findByPk(seatNameId);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = seatNameService;
