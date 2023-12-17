const { getStadiumList, getStadiumAvailability, getStadiumDetails } = require('../Controller/stadium');
const model = require('../Model/stadium');
const httpMocks = require('node-mocks-http');

jest.mock('../Model/stadium');

describe('StadiumController', () => {

    describe('getStadiumList', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest({
              method: 'GET',
              url: '/api/stadium/gym'
            });
            res = httpMocks.createResponse();
          });
        it('should return a list of stadiums for a given category', async () => {
            const mockStadiums = [{
                "stadium_id": 1,
                "name": "Taipei Arena",
                "picture": "https://52.8.178.204/static/G_1.jpeg",
                "price": 100,
                "address": "xxxxx"
            },
            {
                "stadium_id": 6,
                "name": "全台首家健身房上線啦",
                "picture": "https://52.8.178.204/static/G_2.jpeg",
                "price": 50,
                "address": "台北市大安區衝鋒路1號"
            },
            {
                "stadium_id": 7,
                "name": "萵苣",
                "picture": "https://52.8.178.204/static/G_3.jpeg",
                "price": 100,
                "address": "台北市大安區玩真的路2號"
            },
            {
                "stadium_id": 8,
                "name": "建功",
                "picture": "https://52.8.178.204/static/G_4.jpeg",
                "price": 100,
                "address": "台北市大安區練中學1號"
            }];
            model.getStadiumsByCategory.mockResolvedValue(mockStadiums);
            req.params.category = 'gym';

            await getStadiumList(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ stadium: mockStadiums });
        });

        it('should handle errors', async () => {
            model.getStadiumsByCategory.mockRejectedValue(new Error('Database error'));
            req.params.category = 'gym';

            await getStadiumList(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: 'Database error' });
        });
    });

    describe('getStadiumAvailability', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest({
                method: 'GET',
                url: '/api/stadium/gym/1/2023-12-25',
                //params: {
                //    category: 'gym',
                //    stadium_id: 1,
                //    date: '2023-12-25'
                //}
            });
            res = httpMocks.createResponse();
        });

        it('should return availability for a stadium', async () => {
            const mockAvailability = {
                "data": {
                    "times": {
                        "09:00": true,
                        "10:00": true,
                        "11:00": true,
                        "12:00": false,
                        "13:00": true,
                        "14:00": true,
                        "15:00": true,
                        "16:00": true,
                        "17:00": true,
                        "18:00": true,
                        "19:00": true,
                        "20:00": true
                    },
                    "people": 0,
                    "name": "Taipei Arena",
                    "price": 100,
                    "rule": "jiiii",
                    "water": 1,
                    "bathroom": 0,
                    "air_condition": 1,
                    "vending": 1
                }
            };
            model.getStadiumAvailability.mockResolvedValue(mockAvailability);
    
            await getStadiumAvailability(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({ mockAvailability });
        });
    
        it('should handle errors when fetching availability', async () => {
            model.getStadiumAvailability.mockRejectedValue(new Error('Database error'));
    
            await getStadiumAvailability(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: 'Internal server error' });
        });
    });

    describe('getStadiumDetails', () => {
        let req, res;

        beforeEach(() => {
            req = httpMocks.createRequest();
            res = httpMocks.createResponse();
        });

        beforeEach(() => {
            req = httpMocks.createRequest({
                method: 'GET',
                url: '/api/stadium/gym/1'
            });
            res = httpMocks.createResponse();
        });
    
        it('should return details for a specific stadium', async () => {
            const mockDetails = {
                "name": "Taipei Arena",
                "price": 100,
                "rule": "jiiii",
                "water": 1,
                "bathroom": 0,
                "air_condition": 1,
                "vending": 1
            };
            model.getStadiumDetails.mockResolvedValue(mockDetails);
    
            await getStadiumDetails(req, res);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockDetails);
        });
    
        it('should return a 404 if the stadium is not found', async () => {
            model.getStadiumDetails.mockResolvedValue(null);
    
            await getStadiumDetails(req, res);
            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ error: 'Stadium not found' });
        });
    
        it('should handle errors when fetching stadium details', async () => {
            model.getStadiumDetails.mockRejectedValue(new Error('Internal server error'));
    
            await getStadiumDetails(req, res);
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: 'Internal server error' });
        });
    });

    // More tests...
});
