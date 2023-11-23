import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";


const createUserIntoDB = async (user: TUser) => {
    const result = await User.create(user);
    return result;
}

const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result
}

const getSingleUserFromDB = async (userId: number) => {
    const result = await User.findOne({ userId });
    return result;
}

const updateUserToDB = async (userId: number, user: TUser) => {
    const result = await User.updateOne({ userId }, user);
    return result;
}

const deleteUserFromDB = async (userId: number) => {
    const result = await User.updateOne({ userId }, { isActive: false });
    return result;
}

const addOrdersToUser = async (userId: number, order: TOrder) => {
    const result = await User.updateOne({ userId }, { $push: { orders: order } });
    return result;
}

const getAllOrdersFromUserDB = async (userId: number) => {
    const result = await User.findOne({ userId });
    const orders = result?.orders;
    return orders;
}

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserToDB,
    deleteUserFromDB,
    addOrdersToUser,
    getAllOrdersFromUserDB
}