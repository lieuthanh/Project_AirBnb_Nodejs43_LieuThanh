import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export const responseSuccess = (res: Response, data: any, message?: string, statusCode:
    number = HttpStatus.OK) => {
        return res.status(statusCode).json({
            statusCode,
            message: message || 'Success',
            data,
        })
    }
export const responseError = (res: Response, error: any, statusCode:
    number = HttpStatus.BAD_REQUEST) =>{
        return res.status(statusCode).json({
            statusCode,
            message: error.message
        })
    }

    