import * as cartService from "../services/cart.service.js";

export const createCart = async (req, res) => {
    try {
        const cart = await cartService.createCart(req.body.userName);
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.id);
        if (!cart) return res.status(404).json({ error: "Cart not found" });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const item = await cartService.addItemToCart(
            req.params.id,
            productId,
            quantity
        );
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};