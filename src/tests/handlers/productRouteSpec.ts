import app from "../../server";
import supertest from "supertest";
import { Product } from "../../models/products";

const request = supertest(app);

describe('Test product handler', function () {
    const product: Product = {id:1, name: "Test", price:20, category: "Food"};

    describe('These tests should succeed and return 200 response code as authentication is provided', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJOZXZlZW4iLCJsYXN0bmFtZSI6IlNhbWlyIiwicGFzc3dvcmQiOiIkMmIkMTAkNjFtMTlHYVhmOEtyWUVjVlFzZThkdW92ZEdHSVVmbnBjT0Y3QVU5VEJhS2FPSE5qaWZTeS4ifSwiaWF0IjoxNjU4MDA3MzUzfQ.TRB_jHu5hqXF0ezbBseeDIx_kEz4go3CIccnlJ7-AVg';

        it('should return 200 response for getting products', (done) => {
            request.get('/products').then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for getting products by id', (done) => {
            request.get('/products'+'/showById/1').then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for getting products by category', (done) => {
            request.get('/products'+'/showByCategory/Food').then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for creating product', (done) => {
            request.post('/products'+'/create').set("Authorization", "bearer " + token).send(product).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

    });

    describe('These tests should fail and return 401 response code as authentication is not provided', () => {
        it('should return 401 response for creating product', (done) => {
            request.post('/products'+'/create').send(product).then((res) => {
              expect(res.status).toBe(401)
              done();
            })
        });
    });

});