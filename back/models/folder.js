const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Folder extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
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
    db.Folder.belongsTo(db.User); //user:Folder 관계는 1:N
    db.Folder.hasMany(db.Subfolder);
    db.Folder.hasMany(db.Site);
  }
};
