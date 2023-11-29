import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.isUserExists(userId);
  if (result) {
    return result;
  } else {
    throw new Error('User not found in Database');
  }
};

const updateUserToDB = async (userId: number, user: TUser) => {
  const findData = await User.isUserExists(userId);
  if (findData) {
    const updatedUser = await User.updateOne({ userId }, user);
    const afterUpdateUserData = await User.findOne({ userId });
    return { updatedUser, afterUpdateUserData };
  }
};

const deleteUserFromDB = async (userId: number) => {
  const existUser = await User.isUserExists(userId);
  if (existUser) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error('');
  }
};

const addOrdersToUserDB = async (userId: number, order: TOrder) => {
  const findData = await User.isUserExists(userId);
  if (findData) {
    const result = await User.updateOne(
      { userId },
      { $push: { orders: order } },
    );
    return result;
  }
};

const getAllOrdersFromUserDB = async (userId: number) => {
  const existUser = await User.isUserExists(userId);
  if (existUser) {
    const result = await User.findOne({ userId });
    const orders = result?.orders;
    return orders;
  } else {
    throw new Error('User Not Found');
  }
};

const ordersPriceCalculationFromUserDB = async (userId: number) => {
  const existUser = await User.isUserExists(userId);
  if (existUser) {
    const result = await User.findOne({ userId });
    const orders = result?.orders;
    return orders;
  } else {
    throw new Error('User Not Found');
  }
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserToDB,
  deleteUserFromDB,
  addOrdersToUserDB,
  getAllOrdersFromUserDB,
  ordersPriceCalculationFromUserDB,
};
