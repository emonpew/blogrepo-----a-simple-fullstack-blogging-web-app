// src/routes/user.routes.ts
import { Router } from 'express';
import { 
  getAllUser, 
  createUser 
} from '../controllers/user.controller';
import { userValidator } from '../validators/user.validator';
import { handleValidationErrors } from '../middleware/validation';

const router = Router();

router.get('/', getAllUser);
router.post(
  '/',
  userValidator.create,
  handleValidationErrors,
  createUser
);

export default router;