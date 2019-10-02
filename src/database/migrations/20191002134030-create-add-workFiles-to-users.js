module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'workFile', {
      type: Sequelize.INTEGER,
      references: { model: 'workFiles', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'workFile');
  },
};
