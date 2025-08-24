import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace("Bearer ", "")
    try {
        if (!token) {
            return res.status(403).json({"error":"Acceso no autorizado"});  
        }
        console.log(token)
        
        req.user = verifyToken(token)
        console.log(req.user)
        next()   
    } catch (error) {
        console.log("middleware", error)        
        return res.status(403).json({"error":"Token invalido"}); 
    }
}

