const {
    signup,
    signin,
    updateProfile,
    updatePassword
} = require('../Controller/user');
const model = require('../Model/user');
const httpMocks = require('node-mocks-http');

jest.mock('../Model/user');

describe('UserController', () => {

    describe('signup', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest({
                method: 'POST',
                url: '/api/user/signup',
                body: {
                    email: 'test11293@example.com',
                    password: 'password123',
                    name: 'Test User',
                    age: 25,
                    gender: 'M',
                    badminton: 3,
                    basketball: 2,
                    volleyball: 4,
                    self_intro: 'An enthusiast of sports'
                }
            });
            res = httpMocks.createResponse();
        });

        it('should send a 400 status if required fields are missing', async () => {
            req.body = {}; // Empty body
            await signup(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toBe('Missing value');
        });

        // Additional tests for signup...
    });

    describe('signin', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest({
                method: 'POST',
                url: '/api/user/signin',
                body: {
                    "email": "exal@yahoo.com",
                    "password": "yourpasswords"
                }
            });
            res = httpMocks.createResponse();
        });
        // it('should authenticate user and return user_id', async () => {
        //     model.getUser.mockResolvedValue({ user_id: 1, Name: 'John Doe'});

        //     await signin(req, res);
        //     expect(res.statusCode).toBe(200);
        //     expect(res._getJSONData()).toEqual({"user_id":1,"name":"John Doe"});
        // });

        it('should send a 400 status if email is missing', async () => {
            req.body = { "password": "test123" };
            await signin(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toBe('Missing value');
        });
        
        // Additional tests for signin...
    });

    describe('updateProfile', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest({
                method: 'PUT',
                url: '/api/user/profile',
                session: { userId: 1 },
                body: {
                    name: 'Updated Name',
                    email: 'updated@example.com',
                    self_intro: 'Updated intro',
                    badminton: 4,
                    // ... other fields
                }
            });
            res = httpMocks.createResponse();
        });
        it('should update user profile and return user_id', async () => {
            model.updateUser.mockResolvedValue(true);

            await updateProfile(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ user_id: 1 });
        });
        // Additional tests for updateProfile...
    });


    describe('updatePassword', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest({
                method: 'PUT',
                url: '/api/user/profile/password',
                session: { userId: 1 },
                body: {
                    old_password: 'oldpass',
                    new_password: 'newpass'
                }
            });
            res = httpMocks.createResponse();
        });

        it('should send a 400 status if old or new password is missing', async () => {
            req.body = { old_password: 'oldpass' }; // Missing new_password
            await updatePassword(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toBe('Missing value');
        });

        it('should send a 400 status if the old password does not match', async () => {
            req.body = { old_password: 'oldpass', new_password: 'newpass' };
            const mockUser = { password: 'hashedOldPass' };
            model.findUserById.mockResolvedValue(mockUser);
            await updatePassword(req, res);
            expect(res.statusCode).toBe(400);
            expect(res._getData()).toBe('Password does not match');
        });

        it('should update the password successfully', async () => {
            req.body = { 
                old_password: "yourpassword",
                new_password: "yourpasswords"
              };
            model.findUserById.mockResolvedValue({"message": "Password updated successfully"});
            model.updatePassword.mockResolvedValue(true); // Mock successful update
            await updatePassword(req, res);
            expect(res.statusCode).toBe(200);
            // Further assertions...
        });

        // Additional tests for updatePassword...
    });

    // Add more describe blocks for other methods if necessary
});
