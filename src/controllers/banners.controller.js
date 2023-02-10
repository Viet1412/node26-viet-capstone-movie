const respone = require("../helpers/response");
const bannerService = require("../services/banners.service");

const entityName = "banner";
const bannerController = {
  //public controller functions
  getEntityList: () => {
    return async (req, res, next) => {
      try {
        const entityList = await bannerService.getEntityList();
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
          await bannerService.getEntityListPagination(pagination);
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

        const entityDetails = await bannerService.getEntityDetails(id);
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

        const foundEntities = await bannerService.search(
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

  //secured controller functions
  create: () => {
    return async (req, res, next) => {
      try {
        const dataNewEntities = req.body;

        const newEntities = await bannerService.create(dataNewEntities);
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

        const deletedEntity = await bannerService.delete(id);
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

        const updatedEntity = await bannerService.update(id, dataUpdateEntity);
        res.status(200).json(respone(updatedEntity));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
};

module.exports = bannerController;
