const respone = require("../helpers/response");
const cinemaRoomHasShowtimeService = require("../services/cinemaRoomHasShowtimes.service");

const entityName = "cinemaRoomHasShowtime";
const cinemaRoomHasShowtimeController = {
  //secured controller functions
  getEntityList: () => {
    return async (req, res, next) => {
      try {
        const entityList = await cinemaRoomHasShowtimeService.getEntityList();
        res.status(200).json(respone(entityList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getEntityListPagination: () => {
    return async (req, res, next) => {
      try {
        const pagination = req.query;

        const entityListPagination =
          await cinemaRoomHasShowtimeService.getEntityListPagination(
            pagination
          );
        res.status(200).json(respone(entityListPagination));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getEntityDetails: () => {
    return async (req, res, next) => {
      try {
        const dataQuery = req.query;

        const entityDetails =
          await cinemaRoomHasShowtimeService.getEntityDetails(dataQuery);
        res.status(200).json(respone(entityDetails));
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

        const foundEntities = await cinemaRoomHasShowtimeService.search(
          searchKeyWord,
          pagination
        );
        res.status(200).json(respone(foundEntities));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  create: () => {
    return async (req, res, next) => {
      try {
        const dataNewEntities = req.body;

        const newEntities = await cinemaRoomHasShowtimeService.create(
          dataNewEntities
        );
        res.status(201).json(respone(newEntities));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  delete: () => {
    return async (req, res, next) => {
      try {
        const dataQuery = req.query;

        const deletedEntity = await cinemaRoomHasShowtimeService.delete(
          dataQuery
        );
        res
          .status(200)
          .json(
            respone(
              `${entityName} with movieId-${deletedEntity.movieId} deleted`
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
        const dataQuery = req.query;
        const dataUpdateEntity = req.body;

        const updatedEntity = await cinemaRoomHasShowtimeService.update(
          dataQuery,
          dataUpdateEntity
        );
        res.status(200).json(respone(updatedEntity));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
};

module.exports = cinemaRoomHasShowtimeController;
