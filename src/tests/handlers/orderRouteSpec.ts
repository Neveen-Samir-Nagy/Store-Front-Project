import app from "../../server";
import supertest from "supertest";
import { Order } from "../../models/orders";

const request = supertest(app);

describe('Test order handler', function () {

    describe('These tests should succeed and return 200 response code as authentication is provided', () => {

        const order: Order = {id: 1, status: 'active', user_id: 1};
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJOZXZlZW4iLCJsYXN0bmFtZSI6IlNhbWlyIiwicGFzc3dvcmQiOiIkMmIkMTAkNjFtMTlHYVhmOEtyWUVjVlFzZThkdW92ZEdHSVVmbnBjT0Y3QVU5VEJhS2FPSE5qaWZTeS4ifSwiaWF0IjoxNjU4MDA3MzUzfQ.TRB_jHu5hqXF0ezbBseeDIx_kEz4go3CIccnlJ7-AVg';

        it('should return 200 response for getting orders', (done) => {
            request.get('/orders').set("Authorization", "bearer " + token).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for getting orders by current user', (done) => {
            request.get('/orders' + '/currentOrder/1').set("Authorization", "bearer " + token).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for show completed orders by user', (done) => {
            request.get('/orders' + '/showCompletedOrders/1').set("Authorization", "bearer " + token).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for create order', (done) => {
            request.post('/orders' + '/createOrder').set("Authorization", "bearer " + token).send(order).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for create order with products', (done) => {
            request.post('/orders' + '/createOrderWithProducts').set("Authorization", "bearer " + token).send({"quantity": 20, "product_id": 1, "order_id":1}).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

    });

    describe('These tests should fail and return 401 response code as authentication is not provided', () => {

        it('should fail response for getting orders', (done) => {
            request.get('/orders').then((res) => {
              expect(res.status).toBe(401)
              done();
            })
        });

        it('should fail response for getting orders by current user', (done) => {
            request.get('/orders' + '/currentOrder/1').then((res) => {
              expect(res.status).toBe(401)
              done();
            })
        });

        it('should fail response for show completed orders by user', (done) => {
            request.get('/orders' + '/showCompletedOrders/1').then((res) => {
              expect(res.status).toBe(401)
              done();
            })
        });

        it('should fail response for create order', (done) => {
            request.post('/orders' + '/createOrder').then((res) => {
              expect(res.status).toBe(401)
              done();
            })
        });

        it('should fail response for create order with products', (done) => {
            request.post('/orders' + '/createOrderWithProducts').then((res) => {
              expect(res.status).toBe(401)
              done();
            })
        });

    });
});