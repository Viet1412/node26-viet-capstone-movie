// should config manually to generate suitable testing data

const {
  User,
  Movie,
  SeatName,
  CinemaSystem,
  CinemaGroup,
  CinemaRoom,
  Showtime,
  CinemaRoomHasSeat,
  CinemaRoomHasMovie,
  Banner,
  TicketBooking,
} = require("../models");


const generateDataToTest = {
  users: async () => {
    // await User.destroy({ truncate: true });

    for (let index = 1; index <= 10; index++) {
      await User.create({
        account: `dev${index}`,
        firstName: `dev ${index}`,
        lastName: `dev`,
        age: `${15 + index}`,
        email: `dev${index}@g.co`,
        password: `${index}`,
        avatar: `https://url.com/avatar-dev${index}`,
        role: index == 1 ? "admin" : "user",
      });
    }
  },

  movies: async () => {
    // await Movie.destroy({ truncate: true });

    for (let index = 1; index <= 20; index++) {
      await Movie.create({
        name: `Movie ${index}`,
        poster: `https://url.com/poster-movie-${index}`,
        trailer: `https://url.com/trailer-movie-${index}`,
        desc: `short description of movie ${index}`,
        description: `full description of movie ${index}`,
        rating: (index % 10) + 1,
        adminId: index % 2 ? 1 : 4,
      });
    }
  },

  seatNames: async () => {
    // await SeatName.destroy({ truncate: true });

    let num = 65;
    for (let i = 0; i < 5; i++) {
      for (let index = 1; index <= 10; index++) {
        await SeatName.create({
          name: String.fromCharCode(num) + index,
        });
      }
      num++;
    }
  },

  cinemaSystems: async () => {
    // await CinemaSystem.destroy({ truncate: true });

    for (let index = 1; index <= 5; index++) {
      await CinemaSystem.create({
        name: `Cinema System ${index}`,
        website: `https://url.com/website-cinemaSystem-${index}`,
        logo: `https://url.com/logo-cinemaSystem-${index}`,
      });
    }
  },

  cinemaGroups: async () => {
    // await CinemaGroup.destroy({ truncate: true });

    for (let index = 1; index <= 20; index++) {
      await CinemaGroup.create({
        cinemaSystemId: ((index - 1) % 5) + 1,
        name: `Cinema Group ${index}`,
        image: `https://url.com/image-cinemaGroup-${index}`,
        address: `address-cinemaGroup-${index}`,
        city: `city-${(index % 4) + 1}`,
        district: `district ${index}`,
      });
    }
  },

  cinemaRooms: async () => {
    // await CinemaRoom.destroy({ truncate: true });

    for (let i = 1; i <= 10; i++) {
      for (let index = 1; index <= 5; index++) {
        await CinemaRoom.create({
          cinemaGroupId: i,
          name: `Cinema Room ${index}`,
          type: index == 1 ? "3D" : index == 5 ? "I-Max" : "2D",
        });
      }
    }
  },

  showtimes: async () => {
    // await Showtime.destroy({ truncate: true });

    for (let index = 1; index <= 20; index++) {
      await Showtime.create({
        date: `2023-${(index % 3) + 2}-${index}`,
        dateTime: `2023-${
          (index % 3) + 2
        }-${index} , ${index}:${index}:${index}`,
      });
    }
  },

  cinemaRoomHasSeats: async () => {
    // await CinemaRoomHasSeat.destroy({ truncate: true });

    for (let i = 1; i <= 5; i++) {
      for (let index = 1; index <= 50; index++) {
        await CinemaRoomHasSeat.create({
          cinemaRoomId: i,
          seatNameId: index,
          seatType:
            index > 20 && index < 30
              ? "vip"
              : index > 45
              ? "sweet-box"
              : "normal",
          price: index > 20 && index < 30 ? 88000 : index > 45 ? 99000 : 70000,
        });
      }
    }
  },

  cinemaRoomHasMovies: async () => {
    // await CinemaRoomHasMovie.destroy({ truncate: true });

    for (let i = 1; i <= 25; i++) {
      if (i == 1 || i == 8 || i == 13 || i == 20 || i == 25) {
        for (let index = 1; index <= 20; index++) {
          if ((i + index) % 2 !== 0) {
            continue;
          }
          await CinemaRoomHasMovie.create({
            cinemaRoomId: i,
            movieId: index,
            showtimeId: index,
            showStatus: index > 5 && index < 9 ? "coming-soon" : "showing",
            seatBooked: [1, 3, 6],
          });
        }
      }
    }
  },

  banners: async () => {
    // await Banner.destroy({ truncate: true });

    for (let index = 1; index <= 5; index++) {
      await Banner.create({
        name: `Banner ${index}`,
        description: `description-Banner-${index}`,
        url: `https://url.com/url-Banner-${index}`,
        movieId: index,
      });
    }
  },

  ticketBookings: async () => {
    // await TicketBooking.destroy({ truncate: true });

    for (let index = 1; index <= 3; index++) {
      await TicketBooking.create({
        userId: index,
      });
    }
  },
};

module.exports = generateDataToTest;
