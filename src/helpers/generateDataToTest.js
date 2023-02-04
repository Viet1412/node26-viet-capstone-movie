// should config manually to generate suitable testing data

const { User, Movie } = require("../models");

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

  // comments: async () => {
  //   // await Comment.destroy({ truncate: true });

  //   for (let index = 0; index < 20; index++) {
  //     await Comment.create({
  //       userId: `${(index % 10) + 1}`,
  //       pictureId: `${20-index}`,
  //       content: `comment to picture ${20-index}`,
  //     });
  //   }
  // },
};

module.exports = generateDataToTest;
