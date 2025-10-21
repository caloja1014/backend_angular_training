import { Product, Category, Inventory } from "../models/index.js";

export const getAllProducts = async () => {
    return Product.findAll({
        include: [Category, Inventory],
    });
};