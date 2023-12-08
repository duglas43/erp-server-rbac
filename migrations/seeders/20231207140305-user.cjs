'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('User', [
      {
        id: 1,
        login: 'ADMIN',
        passwordHash:
          '$2b$05$m599jM38aIsCCqumbkUl2.6UQcetFz5QJxqj1k5Gi/4qPf9pTWsaq',
        refreshToken: null,
        firstName: 'ADMIN',
        lastName: 'ADMIN',
        patronymic: 'ADMIN',
        language: 'RU',
        email: '',
        phone: '+79999999999',
        lastVisit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
