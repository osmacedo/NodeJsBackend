import jwt from "jsonwebtoken"

export const generateToken = (userID, userName) => {
    return jwt.sign({id:userID,username:userName},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN || '7d'});
}

export const verifyToken = (token) => {
    if (!token) {
        throw new error("Acceso denegado");
        error.status = 403;
        throw error;
    }

    try {
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        console.error("Error al verificar token", error.message);
        throw new error("Token invalido");
    }
}
