import jwt from "jsonwebtoken";

const identifyUser = async (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token not provided, Unauthorized access" })
    }
    
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Invalid token, Unauthorized access" })
    }

    req.user = decoded;
    next();
}

export default identifyUser;
