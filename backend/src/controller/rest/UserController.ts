import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { dbInstance } from '../../model/Models.js';
import { controllerResult } from './ControllerUtility.js';
import type { DbUserResult, User } from '../../model/UserModel.js';



export const UserController = {
  async getUser(req: Request) {
    const { username } = req.body;
    const gotUser = await dbInstance.userModel.findUserSafe(username);
    return gotUser;
  }
}