import env from '../env.config.js'

export const CheckAPIKey = (req,res,next) =>{
const origin = req.headers.origin;
    try
    { 
     if(env.API_KEY == req.headers.apikey)  
         return next();
     else
        return res.status(401).send({ message: "Unauthorized!" });
     
    } 
    catch (err) {
        console.log(err)
        return res.status(401).send({ message: "Something went wrong!" });
      }
    }

