import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "kunci_rahasia_digilab_2026";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        
        req.user = decoded; 
        
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Token tidak valid atau sudah kadaluwarsa!" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Akses ditolak! Anda bukan Admin." });
    }
    next();
};