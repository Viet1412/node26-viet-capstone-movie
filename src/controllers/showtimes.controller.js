const respone = require("../helpers/response");
const showtimeService = require("../services/showtimes.service");

const entityName = "showtime";
const showtimeController = {
  //secured controller functions
  getEntityList: () => {
    return async (req, res, next) => {
      try {
        const entityList = await showtimeService.getEntityList();
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
          await showtimeService.getEntityListPagination(pagination);
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
        const { id } = req.params;

        const entityDetails = await showtimeService.getEntityDetails(id);
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

        const foundEntities = await showtimeService.search(
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

        const newEntities = await showtimeService.create(dataNewEntities);
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
        const { id } = req.params;

        const deletedEntity = await showtimeService.delete(id);
        res
          .status(200)
          .json(
            respone(
              `${entityName} <${deletedEntity.dateTime}> with id-${deletedEntity.id} deleted`
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
        const { id } = req.params;
        const dataUpdateEntity = req.body;

        const updatedEntity = await showtimeService.update(
          id,
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

module.exports = showtimeController;
