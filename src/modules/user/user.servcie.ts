import { TUser } from "./user.interface";
import { UserModel } from "./user.model";


const createUserIntoDB = async (user: TUser) => {
    const result = await UserModel.create(user);
    return result;
}

const getAllUsersFromDB = async () => {
    const result = await UserModel.find();
    return result
}

export const userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
}