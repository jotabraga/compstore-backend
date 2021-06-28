import express from 'express';
import cors from 'cors';

export default function customExpress(){
    const app = express();
    app.use(cors());
    app.use(express.json());

    return app;
}