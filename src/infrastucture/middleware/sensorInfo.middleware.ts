import { Request, Response, NextFunction } from "express"


const sensorValidatorInput = (request:Request,response:Response,next:NextFunction) =>{
    const {body} = request;
    if(typeof body.registration === "string" &&
     typeof body.localization[0]=='number' &&
     typeof body.localization[1]=='number' &&
     typeof body.heigh=='number' && 
     typeof body.velocity=='number' &&
     typeof body.city === "string" &&
     typeof body.image === "string"){
        console.log("inside middle")
        next()
    } else {
        response.status(404).json({msg:'error in type of data sended',code:404})
    }
    
}

export default sensorValidatorInput;