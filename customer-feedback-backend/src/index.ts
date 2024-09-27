import  express from "express";
import cors from "cors";
import UserRouter from './routes/userRouter';
import ProductRouter from './routes/productRouter';
import FeedbackRouter from './routes/feedbackRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRouter);
app.use('/api/products', ProductRouter);
app.use('/api/feedback', FeedbackRouter);

app.listen(3002);
