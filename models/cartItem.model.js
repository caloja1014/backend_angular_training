import { DataTypes } from "sequelize";

export default (sequelize) => {
    const CartItem = sequelize.define("CartItem", {
        quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    });
    return CartItem;
}
