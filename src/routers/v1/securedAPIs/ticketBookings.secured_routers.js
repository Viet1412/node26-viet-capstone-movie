const express = require("express");
const ticketBookingController = require("../../../controllers/ticketBookings.controller");
const requiredRole = require("../../../middlewares/requiredRoles");

const ticketBookingManagementRouters = express.Router();

//only admin access
ticketBookingManagementRouters.get("", requiredRole("admin"), ticketBookingController.getTicketBookingList());
ticketBookingManagementRouters.get("/ticketBookingListPagination", requiredRole("admin"), ticketBookingController.getTicketBookingListPagination());
ticketBookingManagementRouters.delete("/:id", requiredRole("admin"), ticketBookingController.delete());
ticketBookingManagementRouters.post("/search", requiredRole("admin"), ticketBookingController.search());

//admin & account owner access
ticketBookingManagementRouters.post("/getInfoToBookTicket", ticketBookingController.getInfoToBookTicket());
ticketBookingManagementRouters.post("", ticketBookingController.create());
ticketBookingManagementRouters.get("/:id", ticketBookingController.getTicketBookingDetails());


module.exports = ticketBookingManagementRouters;
