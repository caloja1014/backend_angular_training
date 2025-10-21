import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define("Product", {
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        price: { type: DataTypes.FLOAT, allowNull: false },
        imageUrl: DataTypes.STRING,
    });
};