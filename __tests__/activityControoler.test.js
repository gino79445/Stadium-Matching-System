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
    // Similar tests for getActivity as getAllActivity
  });

  describe('joinActivity', () => {
    // Similar tests for joinActivity as getAllActivity
  });

  describe('myActivity', () => {
    // Similar tests for myActivity as getAllActivity
  });

  describe('leaveActivity', () => {
    // Similar tests for leaveActivity as getAllActivity
  });
});

