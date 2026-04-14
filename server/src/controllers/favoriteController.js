import { prisma } from "../config/db.js";

export const toggleFavorite = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.id;

        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_bookId: { userId, bookId: Number(bookId) }
            }
        });

        if (existingFavorite) {
            await prisma.favorite.delete({ where: { id: existingFavorite.id } });
            return res.status(200).json({ message: "Dihapus dari favorit", isFavorited: false });
        } else {
            await prisma.favorite.create({
                data: { userId, bookId: Number(bookId) }
            });
            return res.status(201).json({ message: "Ditambahkan ke favorit", isFavorited: true });
        }
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
};

export const checkFavorite = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.id;

        const favorite = await prisma.favorite.findUnique({
            where: { userId_bookId: { userId, bookId: Number(bookId) } }
        });

        res.status(200).json({ isFavorited: !!favorite }); 
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
};

export const getUserFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const favorites = await prisma.favorite.findMany({
            where: { userId },
            include: {
                book: {
                    include: { genres: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const books = favorites.map(fav => fav.book);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
};