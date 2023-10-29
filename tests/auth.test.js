const supertest = require('supertest');
const app = require('../app');
const { connect } = require('./db');
const UserModel = require('../models/user.model');

// Test suite
describe('Authentication Tests', () => {
    let connection
    // before hook
    beforeAll(async () => {
        connection = await connect()
    })

    afterEach(async () => {
        await connection.cleanup()
    })
    
    // after hook
    afterAll(async () => {
        await connection.disconnect()
    })


    // Test case
    it('should successfully register a user', async () => {
        const response = await supertest(app)
        .post('/users/signup')
        .set('content-type', 'application/json')
        .send({
            username: "sojidan",
            password: "12345678",
            email: "dan@example.com",
            firstname: "soji",
            lastname: "daniel"
        })

        // expectations
        expect(response.status).toEqual(201);
        expect(response.body.user).toMatchObject({
            username: "sojidan",
            email: "dan@example.com",
            firstname: "soji",
            lastname: "daniel"
        })
    })

    // Test case
    it('should successfully login a user', async () => {
        await UserModel.create({
            username: "sojidan",
            email: "dan@example.com",
            firstname: "soji",
            lastname: "daniel",
            password: "12345678"
        });

        const response = await supertest(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({
            username: "sojidan",
            password: "12345678"
        })

        // expectations
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject({
            message: 'Login successful',
            token: expect.any(String),
            user: expect.any(Object)
        })

        expect(response.body.user.username).toEqual('sojidan');
        expect(response.body.user.email).toEqual('dan@example.com');
    })

    it('should not successfully login a user, when user does not exist', async () => {
        await UserModel.create({
            username: "sojidan",
            email: "dan@example.com",
            firstname: "soji",
            lastname: "daniel",
            password: "12345678"
        });

        const response = await supertest(app)
        .post('/users/login')
        .set('content-type', 'application/json')
        .send({
            email: "sam@example.com",
            password: "12345678"
        })

        // expectations
        expect(response.status).toEqual(404);
        expect(response.body).toMatchObject({
            message: 'User not found',
        })
    })
})