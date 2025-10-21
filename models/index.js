import { sequelize } from "../config/database.js";
import CategoryModel from "./category.model.js";
import ProductModel from "./product.model.js";
import InventoryModel from "./inventory.model.js";
import CartModel from "./cart.model.js";
import CartItemModel from "./cartItem.model.js";

export const Category = CategoryModel(sequelize);
export const Product = ProductModel(sequelize);
export const Inventory = InventoryModel(sequelize);
export const Cart = CartModel(sequelize);
export const CartItem = CartItemModel(sequelize);

// Define relationships
Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasOne(Inventory, { onDelete: "CASCADE" });
Inventory.belongsTo(Product);

Cart.hasMany(CartItem, { onDelete: "CASCADE" });
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

export const initModels = async () => {
    await sequelize.sync({ alter: true });
};