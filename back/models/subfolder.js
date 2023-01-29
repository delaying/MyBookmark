const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Subfolder extends Model {
  static init(sequelize) {
    return super.init(
      {
        subfolder: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", //한글+이모티콘저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Subfolder.belongsTo(db.User);
    db.Subfolder.belongsTo(db.Folder);
    db.Subfolder.hasMany(db.Site);
  }
};
