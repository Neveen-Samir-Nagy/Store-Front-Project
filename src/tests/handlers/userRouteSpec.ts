import app from "../../server";
import supertest from "supertest";
import { User } from "../../models/users";

const request = supertest(app);

describe('Test user handler', function () {
    describe('These tests should fail and return 401 response code as authentication is not provided', () => {
        it('should return 401 response for getting users', (done) => {
            request.get('/users').then((res) => {
              expect(res.status).toBe(401)
              done();
            })
        });

        it('should return 401 response for getting user by id', (done) => {
            request.get('/users'+'/showById/1').then((res) => {
              expect(res.status).toBe(401)
              done();
            })
        });
    });

    describe('These tests should succeed and return 200 response code as authentication is provided', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJOZXZlZW4iLCJsYXN0bmFtZSI6IlNhbWlyIiwicGFzc3dvcmQiOiIkMmIkMTAkNjFtMTlHYVhmOEtyWUVjVlFzZThkdW92ZEdHSVVmbnBjT0Y3QVU5VEJhS2FPSE5qaWZTeS4ifSwiaWF0IjoxNjU4MDA3MzUzfQ.TRB_jHu5hqXF0ezbBseeDIx_kEz4go3CIccnlJ7-AVg';
        const user: User = {id:1, firstName:"Neveen", lastName: "Samir", password: "123456"};

        it('should return 200 response for getting users', (done) => {
            request.get('/users').set("Authorization", "bearer " + token).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for getting user by id', (done) => {
            request.get('/users'+'/showById/1').set("Authorization", "bearer " + token).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });

        it('should return 200 response for creating a user', (done) => {
            request.post('/users'+'/create').send(user).then((res) => {
              expect(res.status).toBe(200)
              done();
            })
        });
    });

});