import { prisma } from "../config/db.js";

export const getDashboardStats = async (req, res) => {
    try {
        const [totalBooks, totalMembers, activeLoans, pendingRequests] = await Promise.all([
            prisma.book.count(),
            prisma.user.count({ 
                where: { role: 'MEMBER', isApproved: true } 
            }),
            prisma.transaction.count({ 
                where: { status: 'BORROWED' } 
            }),
            prisma.transaction.count({ 
                where: { status: { in: ['PENDING_BORROW', 'PENDING_RETURN'] } }
            })
        ]);

        const pendingUsers = await prisma.user.count({
            where: { isApproved: false }
        });

        const pendingResets = await prisma.user.count({
            where: { isResetPending: true }
        });

        const recentActivities = await prisma.transaction.findMany({
            take: 5,
            orderBy: { updatedAt: 'desc' },
            include: {
                user: { select: { name: true } },
                book: { select: { title: true } }
            }
        });

        res.status(200).json({
            stats: {
                totalBooks,
                totalMembers,
                activeLoans,
                totalPending: pendingRequests + pendingUsers + pendingResets
            },
            recentActivities
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data dashboard", error: error.message });
    }
};