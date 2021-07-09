import {Request, Response, Function} from "express";
import {validationResult} from "express-validator";
import * as jwt from 'jsonwebtoken';
import * as httpStatus from "http-Status";

export function AuthMiddleware(req: Request, res: Response, next: Function) {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).send('unauthorized');
  }
  next();
}

export function showApiError(req: Request, res: Response, next: Function) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    next();
}

export function JwtTokenMiddleware(req: Request, res: Response, next: Function) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token,'Agwenbi',(error,decoded) => {//Agwenbi表示密钥，参考第二步设置的密钥
      console.log(error);
      if (error != null) {
        const tokenFlag = error.name;
        if(tokenFlag === 'TokenExpiredError'){
            res.status(httpStatus.UNAUTHORIZED).json({
              msg:'token expired'
            });
        }else if(tokenFlag === 'JsonWebTokenError'){
            res.status(httpStatus.UNAUTHORIZED).json({
              msg:'invalid token'
            });
        }
      }else {
        next();
      }
    });
  } else {
     res.status(httpStatus.UNAUTHORIZED).json({
        msg:'no token'
     });
  }
  
}