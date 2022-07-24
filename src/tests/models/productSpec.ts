import { productStore, Product } from "../../models/products";

describe('Test product model', () => {
    const product_store: productStore = new productStore();
    const product: Product = {id:1, name: "Test Product", price: 30, category: "Food"};

    it('Test index method', async () => {
        const result = await product_store.index();
        expect(result).toBeTruthy();
    });

    it('Test show by id method', async () => {
        const result = await product_store.showById(0);
        expect(result).toBeUndefined();
    });

    it('Test show by category method', async () => {
        const result = await product_store.showByCategory('food');
        expect(result).toBeDefined();
    });

    it('Test create method', async () => {
        const result = await product_store.create(product);
        expect(result).toBeInstanceOf(Object);
    });
});