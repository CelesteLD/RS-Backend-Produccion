import bcrypt from 'bcrypt';

export class PasswordService {
    static saltRounds = 10;

    static async encrypt(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    static async check(password, hashedPassword) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            return false;
        }
    }
}
