const { Op } = require("sequelize");
const { AppError } = require("../helpers/error");
const {
  TicketBooking,
  CinemaRoomHasMovie,
  CinemaRoomHasSeat,
  BookingDetail,
} = require("../models");

const ticketBookingService = {
  //secured services
  getTicketBookingList: async () => {
    try {
      const ticketBookingList = await TicketBooking.findAll();
      if (!ticketBookingList.length) {
        throw new AppError(404, "No ticketBooking found");
      }

      return ticketBookingList;
    } catch (error) {
      throw error;
    }
  },

  getTicketBookingListPagination: async (pagination) => {
    try {
      const page = pagination.page * 1;
      const quantityPerPage = pagination.quantityPerPage * 1;

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        throw new AppError(404, "Pagination value must be larger than 0");
      }

      const ticketBookingListPagination = await TicketBooking.findAndCountAll({
        offset: (page - 1) * quantityPerPage,
        limit: quantityPerPage,
      });
      const { count, rows } = ticketBookingListPagination;

      if (!count) {
        throw new AppError(404, "No ticketBooking found");
      }

      return {
        totalRecords: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        ticketBookingListPagination: rows.length
          ? rows
          : "Found no other ticketBookings",
      };
    } catch (error) {
      throw error;
    }
  },

  getTicketBookingDetails: async (ticketBookingId, requester) => {
    try {
      const ticketBooking = await TicketBooking.findByPk(ticketBookingId, {
        attributes: {
          exclude: ["userId"],
        },
        include: [
          {
            association: "owner",
          },
          {
            association: "bookingDetails",
            attributes: ["price"],
            include: [
              {
                association: "movie",
                attributes: ["name", "director", "duration", "ageRate"],
              },
              {
                association: "cinemaRoom",
                attributes: ["name", "type"],
                include: [
                  {
                    association: "inCinemaGroup",
                    attributes: ["name", "address"],
                  },
                ],
              },
              {
                association: "showtime",
                attributes: ["dateTime"],
              },
              {
                association: "seat",
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      if (!ticketBooking) {
        throw new AppError(404, "ticketBooking not found");
      }

      // role user can see only the details of tickets they booked
      if (requester.role !== "admin" && requester.id !== ticketBooking.userId) {
        throw new AppError(403, "Not permitted");
      }

      return ticketBooking;
    } catch (error) {
      throw error;
    }
  },

  search: async (searchKeyWord, pagination) => {
    //make search service capable of being used with or without Pagination
    try {
      const page = pagination.page * 1;
      const quantityPerPage = pagination.quantityPerPage * 1;

      //check if pagination value valid
      const offsetValue = page > 0 && (page - 1) * quantityPerPage;

      const foundticketBookings = await TicketBooking.findAndCountAll({
        include: [
          {
            association: "owner",
            where: {
              [Op.or]: [
                { account: { [Op.like]: `%${searchKeyWord}%` } },
                { email: { [Op.like]: `%${searchKeyWord}%` } },
                { firstName: { [Op.like]: `%${searchKeyWord}%` } },
                { lastName: { [Op.like]: `%${searchKeyWord}%` } },
              ],
            },
          },
        ],
        offset: offsetValue > 0 ? offsetValue : 0,
        limit: quantityPerPage > 0 ? quantityPerPage : 9999,
      });

      const { count, rows } = foundticketBookings;

      if (!count) {
        throw new AppError(404, "No ticketBooking found");
      }

      if (!page || page <= 0 || !quantityPerPage || quantityPerPage <= 0) {
        return rows;
      }

      return {
        totalRecordsFound: count,
        totalPages: Math.ceil(count / quantityPerPage),
        currentPage: page,
        quantityPerPage: quantityPerPage,
        ticketBookingListPagination: rows.length
          ? rows
          : "Found no more ticketBookings",
      };
    } catch (error) {
      throw error;
    }
  },

  getInfoToBookTicket: async (dataQueryInfoToBookTicket) => {
    try {
      if (Object.keys(dataQueryInfoToBookTicket).length == 0) {
        throw new AppError(400, "Data cannot be empty");
      }
      const { cinemaRoomId, movieId, showtimeId } = dataQueryInfoToBookTicket;
      if (cinemaRoomId <= 0 || movieId <= 0 || showtimeId <= 0) {
        throw new AppError(400, `Data cannot be a negative number`);
      }

      const cinemaRoomHasMovie = await CinemaRoomHasMovie.findOne({
        where: {
          cinemaRoomId,
          movieId,
          showtimeId,
        },
        attributes: ["showStatus", "seatBooked"],
        include: [
          {
            association: "movieDetails",
            attributes: ["name", "poster", "director", "duration", "ageRate"],
          },
          {
            association: "cinemaRoomInfo",
            attributes: ["name", "type"],
            include: [
              {
                association: "inCinemaGroup",
                attributes: ["name", "address"],
              },
            ],
          },
          {
            association: "showtimeDetails",
            attributes: ["dateTime"],
          },
        ],
      });
      if (!cinemaRoomHasMovie) {
        throw new AppError(
          404,
          `Cannot find showtime of movie with id-${movieId} in this cinema`
        );
      }

      const cinemaRoomHasSeats = await CinemaRoomHasSeat.findAll({
        where: { cinemaRoomId },
        attributes: {
          exclude: ["cinemaRoomId"],
        },
        include: [
          {
            association: "nameOfSeat",
            attributes: ["name"],
          },
        ],
      });

      const seatBookingStatus = `${cinemaRoomHasMovie.seatBooked.length}/${cinemaRoomHasSeats.length}`;

      cinemaRoomHasSeats.map((seat) => {
        if (cinemaRoomHasMovie.seatBooked.includes(seat.seatNameId)) {
          seat.dataValues.bookedStatus = true;
        } else {
          seat.dataValues.bookedStatus = false;
        }
      });

      return { seatBookingStatus, cinemaRoomHasMovie, cinemaRoomHasSeats };
    } catch (error) {
      throw error;
    }
  },

  create: async (dataNewTicketBooking, requester) => {
    try {
      if (Object.keys(dataNewTicketBooking).length == 0) {
        throw new AppError(400, "Data cannot be empty");
      }

      const cinemaRoomHasMovie = await CinemaRoomHasMovie.findOne({
        where: {
          cinemaRoomId: dataNewTicketBooking.cinemaRoomId,
          movieId: dataNewTicketBooking.movieId,
          showtimeId: dataNewTicketBooking.showtimeId,
        },
      });
      if (!cinemaRoomHasMovie) {
        throw new AppError(
          404,
          `Cannot find showtime of movie with id-${dataNewTicketBooking.movieId} in this cinema`
        );
      }

      const seatBookingList = [];
      await Promise.all(
        dataNewTicketBooking.seatNameIdList.map(async (seatNameId) => {
          if (seatNameId <= 0) {
            throw new AppError(400, `seatNameId:${seatNameId} does not exist`);
          }
          if (cinemaRoomHasMovie.seatBooked.includes(seatNameId)) {
            throw new AppError(
              400,
              `seat with seatNameId-${seatNameId} is already booked`
            );
          }
          let seatOfCinemaRoom = await CinemaRoomHasSeat.findOne({
            where: {
              cinemaRoomId: dataNewTicketBooking.cinemaRoomId,
              seatNameId,
            },
          });
          if (!seatOfCinemaRoom) {
            throw new AppError(
              404,
              `Cannot find seat with id-${seatNameId} in this cinema_room`
            );
          }
          cinemaRoomHasMovie.seatBooked.push(seatNameId);
          seatBookingList.push(seatOfCinemaRoom);
        })
      );

      // update seats booked by user
      await CinemaRoomHasMovie.update(
        JSON.parse(JSON.stringify(cinemaRoomHasMovie)),
        {
          where: {
            cinemaRoomId: dataNewTicketBooking.cinemaRoomId,
            movieId: dataNewTicketBooking.movieId,
            showtimeId: dataNewTicketBooking.showtimeId,
          },
        }
      );

      const createdNewBooking = await TicketBooking.create({
        userId: requester.id,
      });

      let totalPrice = 0;
      await Promise.all(
        dataNewTicketBooking.seatNameIdList.map(async (seatNameId, index) => {
          await BookingDetail.create({
            ticketBookingId: createdNewBooking.id,
            cinemaRoomId: dataNewTicketBooking.cinemaRoomId,
            movieId: dataNewTicketBooking.movieId,
            showtimeId: dataNewTicketBooking.showtimeId,
            seatNameId,
            seatType: seatBookingList[index].seatType,
            price: seatBookingList[index].price,
          });
          totalPrice += seatBookingList[index].price * 1;
        })
      );

      await TicketBooking.update(
        {
          totalTicket: seatBookingList.length,
          totalPrice,
        },
        {
          where: {
            id: createdNewBooking.id,
          },
        }
      );

      const newTicketBooking = await TicketBooking.findByPk(
        createdNewBooking.id,
        {
          attributes: {
            exclude: ["userId"],
          },
          include: [
            {
              association: "owner",
            },
            {
              association: "bookingDetails",
              attributes: ["price"],
              include: [
                {
                  association: "movie",
                  attributes: ["name", "director", "duration", "ageRate"],
                },
                {
                  association: "cinemaRoom",
                  attributes: ["name", "type"],
                  include: [
                    {
                      association: "inCinemaGroup",
                      attributes: ["name", "address"],
                    },
                  ],
                },
                {
                  association: "showtime",
                  attributes: ["dateTime"],
                },
                {
                  association: "seat",
                  attributes: ["name"],
                },
              ],
            },
          ],
        }
      );

      return newTicketBooking;
    } catch (error) {
      throw error;
    }
  },

  delete: async (ticketBookingId) => {
    try {
      const ticketBooking = await TicketBooking.findByPk(ticketBookingId);
      if (!ticketBooking) {
        throw new AppError(404, "ticketBooking not found");
      }

      await TicketBooking.destroy({ where: { id: ticketBookingId } });

      return ticketBooking;
    } catch (error) {
      throw error;
    }
  },

};

module.exports = ticketBookingService;
