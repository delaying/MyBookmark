const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Site extends Model {
  static init(sequelize) {
    return super.init(
      {
        link: {
          type: DataTypes.STRING(200), //url이라 길어질수있음
          allowNull: false,
        },
        explain: {
          type: DataTypes.TEXT,
          allowNull: true, //필수는 아님
        },
        //UserId:{}
        //FolderId:{}
        //SubfolderId:{}
        //위처럼 belongsTo가 foreign key 만들어줌!
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", //한글+이모티콘저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Site.belongsTo(db.User);
    db.Site.belongsTo(db.Folder);
    db.Site.belongsTo(db.Subfolder);
    db.Site.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Site.hasOne(db.Image);
  }
};
