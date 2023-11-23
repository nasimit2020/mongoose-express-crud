import { Schema, model } from 'mongoose';
import { TOrder, TUser, TUserAddress, TUserName } from './user.interface';

const userNameSchema = new Schema<TUserName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

const userAddressSchema = new Schema<TUserAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
})

const userOrderSchema = new Schema<TOrder>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
})

const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: userNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    hobbies: [{ type: String, required: true }],
    address: { type: userAddressSchema, required: true },
    orders: [
        { type: userOrderSchema, required: true }
    ]
})



export const User = model<TUser>('User', userSchema)