import { orderStore, Order } from "../../models/orders";

describe('Test order model', () => {
    const order_store: orderStore = new orderStore();
    const order: Order = {id:1, status: "complete", user_id: 1};

    it('Test index method', async () => {
        const result = await order_store.index();
        expect(result).toBeTruthy();
    });

    it('Test current order by user method', async () => {
        const result = await order_store.current_order(1);
        expect(result).toBeDefined();
    });

    it('Test completed order by user method', async () => {
        const result = await order_store.showCompletedOrders(1);
        expect(result).toBeDefined();
    });

    it('Test show by id method', async () => {
        const result = await order_store.showById(1);
        expect(result).toBeDefined();
    });

    it('Test create method', async () => {
        const result = await order_store.create(order);
        expect(result).toBeInstanceOf(Object);
    });

    it('Test create order with products method', async () => {
        const result = await order_store.createOrderWithProducts(20, 1, 1);
        expect(result).toBeTruthy();
    });
});