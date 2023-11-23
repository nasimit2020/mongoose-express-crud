import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes
// 1. Create a new user                                           POST           /api/users
// 2. Retrieve a list of all users                                GET            /api/users
// 3. Retrieve a specific user by ID                              GET            /api/users/:userId
// 4. Update user information                                     PUT            /api/users/:userId
// 5. Delete a user                                               DELETE         /api/users/:userId


app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
