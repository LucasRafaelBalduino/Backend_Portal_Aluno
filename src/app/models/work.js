import Sequelize, { Model } from 'sequelize';

class Work extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        date_final: sequelize.DATE,
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

export default Work;
