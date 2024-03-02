import { Login } from '../../../src/controllers/auth';
import { Request, Response } from 'express';
import { User } from '../../../src/models';

jest.mock('../../../src/models');

describe('Login controller', function () {
    const mockResponseStatus = jest.fn();
    const req = {
      body: {
        email: '123',
        password: '123'
      }
    }
    let res = {
      status: mockResponseStatus
    };
    let next = jest.fn()
    it('returns 404 when user does not exist', async () => {
      const mockFindOne = jest.fn();
      (User.findOne as jest.Mock).mockImplementation(mockFindOne);

      await Login(req as Request, res as any as Response, next)
      expect(mockFindOne).toHaveBeenCalledTimes(1);
      expect(mockFindOne).toHaveBeenCalledWith({ email: req.body.email })
      expect(mockResponseStatus).toHaveBeenCalledTimes(1);
      expect(mockResponseStatus).toHaveBeenCalledWith(404);
    });
});
