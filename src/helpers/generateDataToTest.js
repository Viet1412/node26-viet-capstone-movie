// should config manually to generate suitable testing data

const { User } = require("../models");

const generateDataToTest = {
  users: async () => {
    await User.destroy({ truncate: true });

    for (let index = 1; index < 11; index++) {
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

  // pictures: async () => {
  //   await Picture.destroy({ truncate: true });

  //   for (let index = 0; index < 20; index++) {
  //     await Picture.create({
  //       name: `picture ${index + 1}`,
  //       url: `https://url ${index + 1}`,
  //       description: `description of picture ${index + 1}`,
  //       ownerId: `${(index % 10) + 1}`,
  //     });
  //   }
  // },

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
