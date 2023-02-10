const respone = require("../helpers/response");
const cinemaSystemService = require("../services/cinemaSystems.service");

const entityName = "cinemaSystem";
const cinemaSystemController = {
  //public controller functions
  getEntityList: () => {
    return async (req, res, next) => {
      try {
        const entityList = await cinemaSystemService.getEntityList();
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
          await cinemaSystemService.getEntityListPagination(pagination);
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

        const entityDetails = await cinemaSystemService.getEntityDetails(id);
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

        const foundEntities = await cinemaSystemService.search(
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

  getCinemaGroupsOfCinemaSystems: () => {
    return async (req, res, next) => {
      try {
        const entityList = await cinemaSystemService.getCinemaGroupsOfCinemaSystems();
        res.status(200).json(respone(entityList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },


  getCinemaGroupsOfCinemaSystem: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const cinemaGroupsOfCinemaSystem = await cinemaSystemService.getCinemaGroupsOfCinemaSystem(id);
        res.status(200).json(respone(cinemaGroupsOfCinemaSystem));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },


  getShowtimesOfCinemaSystems: () => {
    return async (req, res, next) => {
      try {
        const entityList = await cinemaSystemService.getShowtimesOfCinemaSystems();
        res.status(200).json(respone(entityList));
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
        const dataNewEntities = req.body;

        const newEntities = await cinemaSystemService.create(dataNewEntities);
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

        const deletedEntity = await cinemaSystemService.delete(id);
        res
          .status(200)
          .json(
            respone(
              `${entityName} <${deletedEntity.name}> with id-${deletedEntity.id} deleted`
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

        const updatedEntity = await cinemaSystemService.update(
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

module.exports = cinemaSystemController;
