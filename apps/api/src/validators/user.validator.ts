// src/validators/user.validator.ts
import { body } from 'express-validator';

export const userValidator = {
  create: [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
  ],
};