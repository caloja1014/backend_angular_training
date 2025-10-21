import { DataTypes } from "sequelize";


export default (sequelize) => {
    const cart = sequelize.define("Cart", {
        userName: { type: DataTypes.STRING, allowNull: false },
    });
    return cart;
}


