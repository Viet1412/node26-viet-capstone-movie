const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const { Movie, CinemaRoomHasMovie, CinemaSystem } = require("../models");

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
        movieListPagination: rows.length ? rows : "Found no other movies",
      };
    } catch (error) {
      throw error;
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const movieDetails = await Movie.findByPk(movieId);
      if (movieDetails) {
        return movieDetails;
      }
      throw new AppError(404, "Movie not found");
    } catch (error) {
      throw error;
    }
  },

  getShowtimesByMovieId: async (movieId) => {
    try {
      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        throw new AppError(404, "Movie not found");
      }

      const isInCinema = await CinemaRoomHasMovie.findAll({
        where: { movieId },
      });
      if (!isInCinema.length) {
        throw new AppError(404, "This movie is not in cinema yet");
      }
      movie.inCinemaStatus = true;

      const movieShowtimes = await CinemaSystem.findAll({
        include: [
          {
            association: "hasCinemaGroups",
            required: true,
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
                    association: "hasShowtimes",
                    required: true,
                    through: {
                      as: "inThisCinema",
                      where: { movieId },
                      attributes: ["showStatus"],
                    },
                  },
                ],
              },
            ],
          },
        ],
      });

      return { movie, movieShowtimes };
    } catch (error) {
      throw error;
    }
  },

  getMovieListByShowtime: async (queryForMovies) => {
    //make service capable of being used with or without Pagination
    try {
      const page = queryForMovies.page * 1;
      const quantityPerPage = queryForMovies.quantityPerPage * 1;
      const { dateStart, dateEnd } = queryForMovies;
      if (!dateStart || !dateEnd) {
        throw new AppError(400, "Cannot find date query");
      }

      //check if user sends an invalid pagination value
      const offsetValue = page > 0 && (page - 1) * quantityPerPage;

      const movieListByShowtime = await Movie.findAll({
        include: [
          {
            association: "movieShowtimes",
            required: true,
            through: {
              as: "inCinema",
              attributes: ["showStatus"],
            },
            where: {
              date: { [Op.between]: [dateStart, dateEnd] },
            },
          },
        ],
        offset: offsetValue > 0 ? offsetValue : 0,
        limit: quantityPerPage > 0 ? quantityPerPage : 9999,
      });

      if (!movieListByShowtime.length) {
        throw new AppError(404, "No movie found");
      }

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        return movieListByShowtime;
      }

      return {
        totalRecordsFound: movieListByShowtime.length,
        totalPages: Math.ceil(movieListByShowtime.length / quantityPerPage),
        currentPage: page,
        quantityPerPage,
        movieListByShowtime,
      };
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
        movieListPagination: rows.length ? rows : "Found no other movies",
      };
    } catch (error) {
      throw error;
    }
  },

  //secured services
  create: async (dataNewMovies, requester) => {
    try {
      if (dataNewMovies.length == 0) {
        throw new AppError(400, "data cannot be empty");
      }

      const newMovies = [];
      for (let index = 0; index < dataNewMovies.length; index++) {
        const newMovie = await Movie.create({
          ...dataNewMovies[index],
          adminId: requester.id,
        });
        newMovies.push(newMovie);
      }

      return newMovies;
    } catch (error) {
      throw error;
    }
  },

  delete: async (movieId) => {
    try {
      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        throw new AppError(404, "movie not found");
      }

      await Movie.destroy({ where: { id: movieId } });

      return movie;
    } catch (error) {
      throw error;
    }
  },

  update: async (movieId, dataUpdateMovie) => {
    try {
      if (Object.keys(dataUpdateMovie).length == 0) {
        throw new AppError(400, "Nothing to update");
      }

      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        throw new AppError(404, "Movie not found");
      }

      //keep id unchanged
      dataUpdateMovie.id = movieId;

      await Movie.update(dataUpdateMovie, { where: { id: movieId } });

      return await Movie.findByPk(movieId);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = movieService;
