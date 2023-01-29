const Sequelize = require("sequelize");

const folder = require("./folder");
const subfolder = require("./subfolder");
const hashtag = require("./hashtag");
const site = require("./site");
const user = require("./user");
const image = require("./image");

//개발 시 development db를 사용한다는 뜻
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Folder = folder;
db.Subfolder = subfolder;
db.Hashtag = hashtag;
db.Site = site;
db.User = user;
db.Image = image;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

//반복문 돌면서 모델들의 관계설정해주는 코드
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
