const model = require('../Model/activity');
const activitiesController = require('../controller/activity');

jest.mock('../Model/activity');

describe('activitiesController', () => {
  describe('getAllActivity', () => {
    it('should return activities on success', async () => {
      const req = { session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.getAllActivity.mockResolvedValueOnce(['activity1', 'activity2']);

      await activitiesController.getAllActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['activity1', 'activity2']);
    });

    it('should return an error on failure', async () => {
      const req = { session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.getAllActivity.mockRejectedValueOnce({ err: 'Some error' });

      await activitiesController.getAllActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ err: { err: 'Some error' } });
    });
  });

  describe('getActivity', () => {
    it('should return activity data for a valid request', async () => {
      const req = { params: { id: 'someActivityId' }, session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.getActivity.mockResolvedValueOnce({ /* Mock activity data here */ });

      await activitiesController.getActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ /* Expected activity data here */ });
    });


  });

  describe('joinActivity', () => {
    it('should allow a user to join an activity', async () => {
      const req = { params: { id: 'someActivityId' }, session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.joinActivity.mockResolvedValueOnce({ activity_id: 1 });

      await activitiesController.joinActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ activity_id: 1 });
    });
/*
    it('should handle errors and return a 500 status', async () => {
      const req = { params: { id: 'someActivityId' }, session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.joinActivity.mockRejectedValueOnce(new Error('Database error'));

      await activitiesController.joinActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ err: 'Database error' });
    });
  */
  });

  describe('myActivity', () => {
    it('should fetch user activities with status "pending"', async () => {
      const req = { session: { userId: 'someUserId' }, params: { Status: 'pending' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.myActivity.mockResolvedValueOnce(['activity1', 'activity2']);

      await activitiesController.myActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['activity1', 'activity2']);
    });

    it('should fetch user activities with status "finish"', async () => {
      const req = { session: { userId: 'someUserId' }, params: { Status: 'finish' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.myActivity.mockResolvedValueOnce(['activity1', 'activity2']);

      await activitiesController.myActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(['activity1', 'activity2']);
    });
/*
    it('should handle errors and return a 500 status', async () => {
      const req = { session: { userId: 'someUserId' }, query: { status: 'pending' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.myActivity.mockRejectedValueOnce(new Error('Database error'));

      await activitiesController.myActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ err: 'Database error' });
    });
*/
  });

  describe('leaveActivity', () => {
    it('should allow a user to leave an activity', async () => {
      const req = { params: { id: 'someActivityId' }, session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.leaveActivity.mockResolvedValueOnce({ activity_id: 1 });

      await activitiesController.leaveActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ activity_id: 1 });
    });
/*
    it('should handle errors and return a 500 status', async () => {
      const req = { params: { id: 'someActivityId' }, session: { userId: 'someUserId' } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      model.leaveActivity.mockRejectedValueOnce(new Error('Database error'));

      await activitiesController.leaveActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ err: 'Database error' });

    });
*/
});
});

