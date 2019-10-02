import Sequelize, { Model } from 'sequelize';

class Turma extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_turma: Sequelize.STRING,
        course: Sequelize.STRING,
        topic: Sequelize.STRING,
        period: Sequelize.STRING,
        days: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'turma_id', as: 'turma' });
  }
}

export default Turma;
