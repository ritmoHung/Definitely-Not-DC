import bcrypt from "bcryptjs";

export async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
    if (!hash) throw new Error("PW: Hash undefined");
    return bcrypt.compare(password, hash);
}