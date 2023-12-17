const model = require('../Model/user');
const pool = require('../Model/db').pool; // Adjust the path to your actual pool
jest.mock('../Model/db', () => ({
    pool: {
        query: jest.fn(),
        execute: jest.fn()
      }
}));

describe('UserModel', () => {

  describe('getUser', () => {
    it('should retrieve a user by column and value', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      pool.query.mockResolvedValue([[mockUser]]); // Mocking the database response

      const user = await model.getUser('email', 'test@example.com');
      expect(user).toEqual(mockUser);
      expect(pool.query).toHaveBeenCalledWith(`SELECT * FROM Users WHERE email = ?`, ['test@example.com']);
    });

    it('should handle errors', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));
      
      await expect(model.getUser('email', 'test@example.com')).rejects.toThrow('Database error');
    });

    // More tests...
  });

  describe('createUser', () => {
    it('should create a user and return its ID', async () => {
      const mockUserId = 1;
      pool.query.mockResolvedValueOnce([{ "user_id": 42}]) // First query (INSERT INTO Users)
                 .mockResolvedValueOnce([{}]); // Second query (INSERT INTO Level)

      const userId = await model.createUser('emailss@example.com', 'John Doe', 'hashedpassword', 25, 'Male', 0, 0, 0, 0, 0, 0, 0, 0, 'Intro');
      expect(userId).toBe(mockUserId);
      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO Users (Email, password, Name, Age, Gender, Created_at, self_intro) VALUES (?, ?, ?, ?, ?, NOW(), ?)',
        ['emailss@example.com', 'hashedpassword', 'John Doe', 25, 'Male', 'Intro']
      );
    });

    it('should handle errors during user creation', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));
      
      await expect(model.createUser('emailss@example.com', 'John Doe', 'hashedpassword', 25, 'Male', 0, 0, 0, 0, 0, 0, 0, 0, 'Intro')).rejects.toThrow('Database error');
    });

    // More tests...
  });

  // Tests for updateUser, findUserById, updatePassword, updateProfilePicture, getUserLevel, generateQRCode...
});

