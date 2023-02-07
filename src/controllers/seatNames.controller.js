const respone = require("../helpers/response");
const seatNameService = require("../services/seatNames.service");

const seatNameController = {
  //public controller functions
  getSeatNameList: () => {
    return async (req, res, next) => {
      try {
        const seatNameList = await seatNameService.getSeatNameList();
        res.status(200).json(respone(seatNameList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getSeatNameListPagination: () => {
    return async (req, res, next) => {
      try {
        const pagination = req.query;

        const seatNameListPagination = await seatNameService.getSeatNameListPagination(
          pagination
        );
        res.status(200).json(respone(seatNameListPagination));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getSeatNameDetails: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const seatNameDetails = await seatNameService.getSeatNameDetails(id);
        res.status(200).json(respone(seatNameDetails));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  search: () => {
    return async (req, res, next) => {
      try {
        const { searchKeyWord } = req.body;
        const pagination = req.query;

        const foundSeatNames = await seatNameService.search(
          searchKeyWord,
          pagination
        );
        res.status(200).json(respone(foundSeatNames));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },


  //secured controller functions
  create: () => {
    return async (req, res, next) => {
      try {
        const dataNewSeatNames = req.body;

        const newSeatNames = await seatNameService.create(dataNewSeatNames);
        res.status(201).json(respone(newSeatNames));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  delete: () => {
    return async (req, res, next) => {
      try {
        const { seatNameId } = req.params;

        const deletedseatName = await seatNameService.delete(seatNameId);
        res
          .status(200)
          .json(
            respone(
              `seatName <${deletedseatName.name}> with id-${deletedseatName.id} deleted`
            )
          );
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  update: () => {
    return async (req, res, next) => {
      try {
        const { seatNameId } = req.params;
        const dataUpdateSeatName = req.body;

        const updatedSeatName = await seatNameService.update(
          seatNameId,
          dataUpdateSeatName
        );
        res.status(200).json(respone(updatedSeatName));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
};

module.exports = seatNameController;
