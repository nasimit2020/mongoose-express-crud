import { Request, Response } from "express";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    try {
        const { users: userData } = req.body;
        const result = await userServices.createUserIntoDB(userData);

        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User creation failed",
            error: {
                code: 404,
                description: "User creation failed"
            }
        })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "No user data found",
            error: {
                code: 404,
                description: "No user data found"
            }
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getSingleUserFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: "Single User get successfully!",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "No user data found",
            error: {
                code: 404,
                description: "No user data found"
            }
        })
    }
}

const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const { users } = req.body;
        const { userId } = req.params;
        if (users.userId === Number(userId)) {
            const result = await userServices.updateUserToDB(Number(userId), users)
            res.status(200).json({
                success: true,
                message: "User Info updated successfully!",
                data: result
            });
        }

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User Id does not match",
            error: error
        })
    }
}


const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        await userServices.deleteUserFromDB(Number(userId))
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User deleted Failed",
            error: {
                code: 404,
                description: "User deleted Failed"
            }
        })
    }
}


const createAnOrder = async (req: Request, res: Response) => {
    try {
        const { order } = req.body;
        const { userId } = req.params;
        const result = await userServices.addOrdersToUser(Number(userId), order)
        res.status(200).json({
            success: true,
            message: "Order add successfully!",
            data: result
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Order failed",
            error: error
        })
    }
}


export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUserInfo,
    deleteSingleUser,
    createAnOrder
}