const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { Movie, Banner } = require("../models");

const movieService = {
  //public services
  getMovieList: async () => {
    try {
      const movieList = await Movie.findAll();
      if (!movieList.length) {
        throw new AppError(404, "No movie found");
      }
      return movieList;
    } catch (error) {
      throw error;
    }
  },

  getMovieListPagination: async (pagination) => {
    try {
      const page = pagination.page * 1;
      const quantityPerPage = pagination.quantityPerPage * 1;

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        throw new AppError(404, "Pagination value must be larger than 0");
      }

      const movieListPagination = await Movie.findAndCountAll({
        offset: (page - 1) * quantityPerPage,
        limit: quantityPerPage,
      });
      const { count, rows } = movieListPagination;

      if (!count) {
        throw new AppError(404, "No movie found");
      }

      return {
        totalRecords: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        movieListPagination: rows.length ? rows : "Found no more movies",
      };
    } catch (error) {
      throw error;
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const movieDetails = await Movie.findByPk(movieId); //include showing status
      if (movieDetails) {
        return movieDetails;
      }
      throw new AppError(404, "movie not found");
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

      const foundMovies = await Movie.findAndCountAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${searchKeyWord}%` } },
            { director: { [Op.like]: `%${searchKeyWord}%` } },
            { description: { [Op.like]: `%${searchKeyWord}%` } },
          ],
        },
        offset: offsetValue > 0 ? offsetValue : 0,
        limit: quantityPerPage > 0 ? quantityPerPage : 9999,
      });

      const { count, rows } = foundMovies;

      if (!count) {
        throw new AppError(404, "No movie found");
      }

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        return rows;
      }

      return {
        totalRecordsFound: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        movieListPagination: rows.length ? rows : "Found no more movies",
      };
    } catch (error) {
      throw error;
    }
  },

  getBannerList: async () => {
    try {
      const bannerList = await Banner.findAll();
      if (!bannerList.length) {
        throw new AppError(404, "No banner found");
      }

      return bannerList;
    } catch (error) {
      throw error;
    }
  },

  //secured services

  // searchPicturesByName: async (pictureName) => {
  //   try {
  //     const pictureListByName = await Picture.findAll({
  //       where: { name: { [Op.like]: `%${pictureName}%` } },
  //       include: [
  //         {
  //           association: "owner",
  //           attributes: {
  //             exclude: ["password", "role", "age", "email"],
  //           },
  //         },
  //       ],
  //       attributes: {
  //         exclude: ["ownerId"],
  //       },
  //     });
  //     return pictureListByName;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // getCommentsOfPicture: async (pictureId) => {
  //   try {
  //     const pictureWithComments = await Picture.findByPk(pictureId, {
  //       include: [
  //         {
  //           association: "hasComments",
  //           attributes: {
  //             exclude: ["pictureId"],
  //           },
  //         },
  //       ],
  //     });
  //     if (pictureWithComments) {
  //       return pictureWithComments;
  //     }
  //     throw new AppError(404, "picture not found");
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // getSaveStatus: async (pictureId, requester) => {
  //   try {
  //     const picture = await Picture.findByPk(pictureId);
  //     if (!picture) {
  //       throw new AppError(404, "Picture not found");
  //     }

  //     const isSaved = await picture.hasSavedByUser(requester.id);
  //     return isSaved;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // create: async (dataNewPictures, requester) => {
  //   try {
  //     if (dataNewPictures.length == 0) {
  //       throw new AppError(400, "data cannot be empty");
  //     }

  //     const newPictures = [];
  //     for (let index = 0; index < dataNewPictures.length; index++) {
  //       const newPicture = await Picture.create({
  //         name: dataNewPictures[index].name,
  //         url: dataNewPictures[index].url,
  //         description: dataNewPictures[index].description,
  //         ownerId: requester.id,
  //       });
  //       newPictures.push(newPicture);
  //     }

  //     return newPictures;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // delete: async (pictureId, requester) => {
  //   try {
  //     const picture = await Picture.findByPk(pictureId);
  //     if (!picture) {
  //       throw new AppError(404, "picture not found");
  //     }

  //     if (requester.role !== "admin" && requester.id !== picture.ownerId) {
  //       throw new AppError(403, "Not permitted");
  //     }

  //     await Picture.destroy({ where: { id: pictureId } });

  //     return picture;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  // update: async (pictureId, dataUpdatePicture, requester) => {
  //   try {
  //     if (Object.keys(dataUpdatePicture).length == 0) {
  //       throw new AppError(400, "nothing to update");
  //     }

  //     const picture = await Picture.findByPk(pictureId);
  //     if (!picture) {
  //       throw new AppError(404, "picture not found");
  //     }

  //     if (requester.role !== "admin" && requester.id !== picture.ownerId) {
  //       throw new AppError(403, "Not permitted");
  //     }

  //     if (
  //       dataUpdatePicture.ownerId !== picture.ownerId &&
  //       requester.role !== "admin"
  //     ) {
  //       throw new AppError(403, "Only admin can change owner_id");
  //     }

  //     //keep id & url unchanged
  //     dataUpdatePicture.id = pictureId;
  //     dataUpdatePicture.url = picture.url;

  //     await Picture.update(dataUpdatePicture, { where: { id: pictureId } });

  //     return await Picture.findByPk(pictureId);
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};

module.exports = movieService;
