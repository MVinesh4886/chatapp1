const Sequelize = require("sequelize");
const db = require("../config/database");
const { DataTypes } = Sequelize;

const GroupMember = db.define("GroupMember", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = GroupMember;
