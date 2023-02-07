// should config manually to generate suitable testing data

const { User, Movie, SeatName } = require("../models");

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
        avatar: `https://url-of-avatar-dev${index}`,
      });
    }
  },

  movies: async () => {
    await Movie.destroy({ truncate: true });

    for (let index = 1; index <= 20; index++) {
      await Movie.create({
        name: `Movie ${index}`,
        poster: `https://url-poster-movie-${index}`,
        trailer: `https://url-trailer-movie-${index}`,
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
};

module.exports = generateDataToTest;
