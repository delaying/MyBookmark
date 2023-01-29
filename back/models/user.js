const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        //Mysql에는 소문자에 복수로 저장됨. users
        email: {
          type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATATIME 등이 많이쓰임
          allowNull: false, // 필수
          unique: true, //고유한 값
        },
        password: {
          type: DataTypes.STRING(100), //비밀번호는 암호화를 하기때문에 100으로 넉넉히사용
          allowNull: false, // 필수
        },
      },
      {
        charset: "utf8",
        collate: "utf8_general_ci", //한글저장
        sequelize,
      }
    );
  }
  //데이터베이스 관계설정
  static associate(db) {
    db.User.hasMany(db.Folder); //user:Folder 관계는 1:N
    db.User.hasMany(db.Subfolder);
    db.User.hasMany(db.Site);
  }
};
