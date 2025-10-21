import { Cart, CartItem, Product, Inventory } from "../models/index.js";

export const createCart = async (userName) => {
    return Cart.create({ userName });
};

export const getCartById = async (id) => {
    const cart = await Cart.findByPk(id, {
        include: { model: CartItem, include: [Product] },
    });

    if (!cart) return null;

    const total = cart.CartItems.reduce(
        (sum, item) => sum + item.quantity * item.Product.price,
        0
    );

    return { ...cart.toJSON(), total };
};

export const addItemToCart = async (cartId, productId, quantity) => {

    const productStock = await Inventory.findOne({
        where: { ProductId: productId },
    });

    if (!productStock || productStock.stock < quantity) {
        throw new Error("Insufficient stock");
    }
    
    const isProductInCart = await CartItem.findOne({
        where: { CartId: cartId, ProductId: productId },
    });

    if (isProductInCart) {
        isProductInCart.quantity += quantity;
        await isProductInCart.save();
        return isProductInCart;
    }
    const product = await Product.findByPk(productId, {
        include: [Inventory],
    });

    if (!product) throw new Error("Product not found");
    if (product.Inventory.stock < quantity)
        throw new Error("Insufficient stock");

    return CartItem.create({ CartId: cartId, ProductId: productId, quantity });
};