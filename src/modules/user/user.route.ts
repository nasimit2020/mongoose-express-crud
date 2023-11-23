import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateUserInfo);
router.delete('/:userId', UserController.deleteSingleUser);
router.put('/:userId/orders', UserController.createAnOrder);
router.get('/:userId/orders', UserController.getAllOrders);




//    1. Add New Product in Order                                 PUT            /api/users/:userId/orders
//    2. Retrieve all orders for a specific user                  GET            /api/users/:userId/orders
//    3. Calculate Total Price of Orders for a Specific User      GET            /api/users/:userId/orders/total-price


export const UserRoutes = router;