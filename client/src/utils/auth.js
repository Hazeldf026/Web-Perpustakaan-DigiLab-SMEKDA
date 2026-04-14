
export const getUserId = () => {
    const userStr = localStorage.getItem('user_data');
    const user = userStr ? JSON.parse(userStr) : null;

    // Kasus normal: user.id ada
    if (user?.id) return user.id;

    // Fallback: decode JWT untuk ambil id
    const token = localStorage.getItem('user_token');
    if (!token) return null;

    try {
        // JWT terdiri dari 3 bagian: header.payload.signature
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.id || null;
    } catch {
        return null;
    }
};
