import jwt from 'jsonwebtoken';

import { connectionDB } from "../config/database.js";
import errorHandler from "./errorHandler.js";

export default async function Checkout(req,res){
    console.log("entrou")
try{
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, secret)

    const {cardNumber, validDate, securityCode, total: value} = req.body

    const result = await connectionDB.query(
        `INSERT INTO transactions 
        ("userId","cardNumber","validDate", "securityCode", value)
        VALUES ($1, $2, $3, $4, $5)`,
        [userId,cardNumber,validDate,securityCode, value]
        
      );
      await connectionDB.query(
          `DELETE FROM cart
          WHERE "userId" = $1`,[userId]
      )
      res.sendStatus(201);
      
      
} catch(e){
    errorHandler(e,res);
}
}