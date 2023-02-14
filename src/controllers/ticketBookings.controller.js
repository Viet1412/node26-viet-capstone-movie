const respone = require("../helpers/response");
const ticketBookingService = require("../services/ticketBookings.service");

const ticketBookingController = {
  // secured controller functions
  getTicketBookingList: () => {
    return async (req, res, next) => {
      try {
        const ticketBookingList =
          await ticketBookingService.getTicketBookingList();
        res.status(200).json(respone(ticketBookingList));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getTicketBookingListPagination: () => {
    return async (req, res, next) => {
      try {
        const pagination = req.query;

        const ticketBookingListPagination =
          await ticketBookingService.getTicketBookingListPagination(pagination);
        res.status(200).json(respone(ticketBookingListPagination));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getTicketBookingDetails: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        const { user: requester } = res.locals;

        const ticketBooking =
          await ticketBookingService.getTicketBookingDetails(id, requester);
        res.status(200).json(respone(ticketBooking));
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

        const foundticketBookings = await ticketBookingService.search(
          searchKeyWord,
          pagination
        );
        res.status(200).json(respone(foundticketBookings));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  create: () => {
    return async (req, res, next) => {
      try {
        const { user: requester } = res.locals;
        const dataNewticketBooking = req.body;
        const newticketBooking = await ticketBookingService.create(
          dataNewticketBooking,
          requester
        );
        res.status(201).json(respone(newticketBooking));
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

        const ticketBooking = await ticketBookingService.delete(id);
        res
          .status(200)
          .json(respone(`ticketBooking with id-${ticketBooking.id} deleted`));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },

  getInfoToBookTicket: () => {
    return async (req, res, next) => {
      try {
        const dataQueryInfoToBookTicket = req.body;

        const infoToBookTicket = await ticketBookingService.getInfoToBookTicket(
          dataQueryInfoToBookTicket
        );
        res.status(200).json(respone(infoToBookTicket));
      } catch (error) {
        console.error("-------->: ", error);
        next(error);
      }
    };
  },
};

module.exports = ticketBookingController;
