export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'None', // ⬅️ THIS IS THE FIX
  maxAge: 1000 * 60 * 60, // 1 hour
};
