const model = require('../Model/event');
const eventController = require('../controller/event');

jest.mock('../Model/event');

describe('Event Controller', () => {
  describe('getEvent', () => {
    it('should return events for a valid request', async () => {
      const req = { session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      // Mocking the behavior of model.getEvent with resolved data
      model.getEvent.mockResolvedValueOnce(['event1', 'event2']);

      // Calling the function under test
      await eventController.getEvent(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['event1', 'event2']);
    });
   /* 
    it('should handle errors and return a 500 status', async () => {
      const req = { session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      // Mocking the behavior of model.getEvent to throw an error
      model.getEvent.mockRejectedValueOnce(new Error('Database error'));

      // Calling the function under test
      await eventController.getEvent(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ err: 'Database error' });
    });
    */
  });
  describe('readEvent', () => {
    it('should return event data for a valid request', async () => {
      const req = { params: { id: 'someEventId' }, session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      // Mocking the behavior of model.readEvent with resolved data
      model.readEvent.mockResolvedValueOnce({ /* Mock event data here */ });

      // Calling the function under test
      await eventController.readEvent(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ /* Expected event data here */ });
    });
    /*
    it('should handle errors and return a 500 status', async () => {
      const req = { params: { id: 'someEventId' }, session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      // Mocking the behavior of model.readEvent to throw an error
      model.readEvent.mockRejectedValueOnce(new Error('Database error'));

      // Calling the function under test
      await eventController.readEvent(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ err: 'Database error' });
    });
    */

    it('should handle "Can not read" and return a 400 status', async () => {
      const req = { params: { id: 'someEventId' }, session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      // Mocking the behavior of model.readEvent with resolved data as null
      model.readEvent.mockResolvedValueOnce(null);

      // Calling the function under test
      await eventController.readEvent(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ err: 'Can not read' });
    });
  });
});

