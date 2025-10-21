import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define("Inventory", {
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    });
};
