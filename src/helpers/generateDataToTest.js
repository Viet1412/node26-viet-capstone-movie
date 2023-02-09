// should config manually to generate suitable testing data

const { User, Movie, SeatName, CinemaSystem, CinemaGroup } = require("../models");

const generateDataToTest = {
  users: async () => {
    await User.destroy({ truncate: true });

    for (let index = 1; index <= 10; index++) {
      await User.create({
        account: `dev${index}`,
        firstName: `dev ${index}`,
        lastName: `dev`,
        age: `${15 + index}`,
        email: `dev${index}@g.co`,
        password: `${index}`,
        avatar: `https://url.com/avatar-dev${index}`,
      });
    }
  },

  movies: async () => {
    await Movie.destroy({ truncate: true });

    for (let index = 1; index <= 20; index++) {
      await Movie.create({
        name: `Movie ${index}`,
        poster: `https://url.com/poster-movie-${index}`,
        trailer: `https://url.com/trailer-movie-${index}`,
        description: `description of movie ${index}`,
        rating: (index % 10) + 1,
        adminId: index % 2 ? 1 : 4,
      });
    }
  },

  seatNames: async () => {
    await SeatName.destroy({ truncate: true });

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
    await CinemaSystem.destroy({ truncate: true });

    for (let index = 1; index <= 5; index++) {
      await CinemaSystem.create({
        name: `Cinema System ${index}`,
        website: `https://url.com/website-cinemaSystem-${index}`,
        logo: `https://url.com/logo-cinemaSystem-${index}`,
      });
    }
  },

  cinemaGroups: async () => {
    await CinemaGroup.destroy({ truncate: true });

    for (let index = 1; index <= 20; index++) {
      await CinemaGroup.create({
        cinemaSystemId: (index-1) % 5 +1,
        name: `Cinema Group ${index}`,
        image: `https://url.com/image-cinemaGroup-${index}`,
        address: `address-cinemaGroup-${index}`,
        city: `city-${index%4 + 1}`,
        district: `district ${index}`,
      });
    }
  },
};

module.exports = generateDataToTest;
