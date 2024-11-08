import { LoginAdmin, adminData } from "../../domain/entities/IAdmin";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
import grpc from '@grpc/grpc-js';

dotenv.config();

export class AdminService {
  async loginAdmin({ email, password }: { email: string, password: string }, callback: any): Promise<void> {
    try {
    

        // Check if the email matches the one in the environment variables
        if (email === process.env.EMAIL) {
            const passwordEnv = process.env.PASSWORD;

            if (!passwordEnv) {
                return callback(null, {
                    success: false,
                    message: "Server error: Password is not configured",
                });
            }

            const isPassword = await bcrypt.compare(password, passwordEnv);

            const adminData = {
                id: process.env.ID || "",
                email: email,
                role: "admin"
            };

            console.log(adminData,":gotvhaa")

            if (isPassword) {
                return callback(null, {
                    success: true,
                    message: "Successfully logged in",
                    role: "admin",
                    adminData,
                });
            } else {
                return callback(null, {
                    success: false,
                    message: "Incorrect Password",
                });
            }
        } else {
            return callback(null, {
                success: false,
                message: "Email incorrect",
            });
        }
    } catch (error) {
        console.error("Error during admin login:", error);

        // Handle error and return an internal error response
        return callback({
            code: grpc.status.INTERNAL,
            message: error instanceof Error ? error.message : 'Unknown error occurred',
        });
    }
}
}
