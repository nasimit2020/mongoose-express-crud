import { z } from "zod";


const userNameValidationSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
});

const userAddressValidationSchema = z.object({
    street: z.string().min(1, { message: 'Street is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
});

export const userOrderValidationSchema = z.object({
    productName: z.string().min(1, { message: 'Product name is required' }),
    price: z.number().min(0.01, { message: 'Price must be greater than 0' }),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

const userValidationSchema = z.object({
    userId: z.number().int().positive({ message: 'User ID must be a positive number' }),
    userName: z.string().min(1, { message: 'User name is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    fullName: userNameValidationSchema,
    age: z.number().int().positive({ message: 'Age must be a positive number' }),
    email: z.string().email({ message: 'Invalid email address' }),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: userAddressValidationSchema,
    orders: z.array(userOrderValidationSchema),
});

export default userValidationSchema;