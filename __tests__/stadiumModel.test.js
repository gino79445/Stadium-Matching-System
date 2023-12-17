const model = require('../Model/stadium');
const pool = require('../Model/db').pool; // Adjust the path to your actual pool
jest.mock('../Model/db', () => ({
  pool: {
    query: jest.fn(),
    execute: jest.fn()
  }
}));

describe('StadiumModel', () => {

    describe('getStadiumsByCategory', () => {
        it('should retrieve stadiums by category', async () => {
          const mockStadiums = [{ stadium_id: 1, name: 'Stadium A', picture: 'picture_url' }];
          pool.query.mockResolvedValue([mockStadiums]);
    
          const stadiums = await model.getStadiumsByCategory('football');
          expect(stadiums).toEqual(mockStadiums);
          expect(pool.query).toHaveBeenCalledWith('SELECT stadium_id, name, picture, price, address FROM Stadiums WHERE category = ?', ['football']);
        });
    
        it('should handle database errors', async () => {
          pool.query.mockRejectedValue(new Error('Database error'));
    
          await expect(model.getStadiumsByCategory('football')).rejects.toThrow('Database error');
        });
      });
    
      describe('getStadiumAvailability', () => {
        it('should retrieve stadium availability for a given date', async () => {
          const mockAvailability = [{ start_time: '09:00', booked: false, people: 20 }];
          pool.execute.mockResolvedValue([mockAvailability]);
    
          const availability = await model.getStadiumAvailability(1, '2023-01-01');
          expect(availability).toEqual(mockAvailability);
          // More assertions...
        });
    
        it('should handle database errors', async () => {
          pool.execute.mockRejectedValue(new Error('Database error'));
    
          await expect(model.getStadiumAvailability(1, '2023-01-01')).rejects.toThrow('Database error');
        });
      });
    
      describe('getStadiumDetails', () => {
        it('should retrieve stadium details', async () => {
          const mockDetails = { name: 'Stadium A', fee: 100, rule: 'Some rules' };
          pool.query.mockResolvedValue([[mockDetails]]);
    
          const details = await model.getStadiumDetails(1);
          expect(details).toEqual(mockDetails);
          expect(pool.query).toHaveBeenCalledWith('SELECT name, price, rule FROM Stadiums WHERE stadium_id = ?', [1]);
        });
    
        it('should handle database errors', async () => {
          pool.query.mockRejectedValue(new Error('Database error'));
    
          await expect(model.getStadiumDetails(1)).rejects.toThrow('Database error');
        });
      });

  // More tests...
});
