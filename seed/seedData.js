import fs from "fs";
import path from "path";
import { Category, Product, Inventory } from "../models/index.js";

const __dirname = import.meta.dirname || path.resolve();

export const seedDatabase = async () => {
    const categoryCount = await Category.count();
    if (categoryCount > 0) {
        console.log("⚠️ Database already seeded — skipping...");
        return;
    }

    console.log("🌱 Starting JSON-based seed...");

    // --- Load JSON files ---
    const categories = JSON.parse(
        fs.readFileSync(path.join(__dirname, "categories.json"), "utf8")
    );
    const products = JSON.parse(
        fs.readFileSync(path.join(__dirname, "products.json"), "utf8")
    );

    // --- Create categories ---
    const categoryMap = {};
    for (const cat of categories) {
        const newCat = await Category.create({ name: cat.name });
        categoryMap[cat.name] = newCat.id;
    }

    // --- Create products + inventory ---
    for (const p of products) {
        const categoryId = categoryMap[p.category];
        const product = await Product.create({
            name: p.name,
            description: p.description,
            price: p.price,
            CategoryId: categoryId,
        });
        await Inventory.create({ ProductId: product.id, stock: p.stock });
    }

    console.log("✅ Database seeded from JSON files!");
};