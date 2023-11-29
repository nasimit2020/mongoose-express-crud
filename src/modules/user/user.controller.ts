import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema, {
  userOrderValidationSchema,
} from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const users = req.body;

    // data validation using zod
    const validatedData = userValidationSchema.parse(users);
    const result = await userServices.createUserIntoDB(validatedData);

    const user = {
      userId: result?.userId,
      username: result?.username,
      fullName: result?.fullName,
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies,
      address: result?.address,
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User creation failed',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsersFromDB();

    const user = users.map((user) => ({
      username: user?.username,
      fullName: user?.fullName,
      age: user?.age,
      email: user?.email,
      address: user?.address,
    }));

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'No user data found',
      error: {
        code: 404,
        description: 'No user data found',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.getSingleUserFromDB(Number(userId));
    const user = {
      userId: result?.userId,
      username: result?.username,
      fullName: result?.fullName,
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies,
      address: result?.address,
    };
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;

    const result = await userServices.updateUserToDB(Number(userId), userData);

    const user = {
      userId: result?.afterUpdateUserData?.userId,
      username: result?.afterUpdateUserData?.username,
      fullName: result?.afterUpdateUserData?.fullName,
      age: result?.afterUpdateUserData?.age,
      email: result?.afterUpdateUserData?.email,
      isActive: result?.afterUpdateUserData?.isActive,
      hobbies: result?.afterUpdateUserData?.hobbies,
      address: result?.afterUpdateUserData?.address,
    };

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userServices.deleteUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User deleted Failed',
      error: {
        code: 404,
        description: 'User deleted Failed',
      },
    });
  }
};

const createAnOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const { userId } = req.params;

    //Order data validation by using zod
    const validatedOrder = userOrderValidationSchema.parse(order);

    const result = await userServices.addOrdersToUserDB(
      Number(userId),
      validatedOrder,
    );
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Order failed',
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getAllOrdersFromUserDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Get All Order successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const ordersPriceCalculation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await userServices.ordersPriceCalculationFromUserDB(
      Number(userId),
    );

    let totalPrice = 0;
    orders?.map((order) => (totalPrice = totalPrice + order.price));
    const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: roundedTotalPrice,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  deleteSingleUser,
  createAnOrder,
  getAllOrders,
  ordersPriceCalculation,
};
