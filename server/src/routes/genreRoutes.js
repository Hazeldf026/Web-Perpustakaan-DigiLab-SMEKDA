import express from "express";
import { prisma } from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ambil semua genre untuk dropdown di frontend
router.get("/", verifyToken, async (req, res) => {
    try {
        const genres = await prisma.genre.findMany();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil genre" });
    }
});

router.get("/:id/books", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const genre = await prisma.genre.findUnique({
            where: { id: Number(id) },
            // Prisma sangat cerdas: kita tinggal include relasinya!
            include: { books: true } 
        });

        if (!genre) return res.status(404).json({ message: "Genre tidak ditemukan" });
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data buku", error: error.message });
    }
});

export default router;