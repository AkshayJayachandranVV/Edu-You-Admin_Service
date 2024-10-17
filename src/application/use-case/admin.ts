// import { UserRepository } from "../../domain/repositories/";
import { LoginAdmin,adminData } from "../../domain/entities/IAdmin";
import dotenv from 'dotenv'
import bcrypt from "bcryptjs";

dotenv.config()




export class AdminService {
 

    async loginAdmin(data: LoginAdmin ): Promise<{ success: boolean; message: string; role?: string, adminData?:adminData }> {
        try {
               console.log("logoin ADMIN")
               console.log(data)

               const {email,password} = data

               if(email == process.env.EMAIL){

                   const passwordEnv = process.env.PASSWORD       

                   console.log(passwordEnv)

                   if (!passwordEnv) {
                    return { success: false, message: "Server error: Password is not configured" };
                 }

                    const isPassword = await bcrypt.compare(password,passwordEnv);

                    const adminData = {
                      id : process.env.ID || "",
                      email : email,
                      role:"admin"
                    }

                    if(isPassword){
                        return { success: true, message: "Successfully logged in",role: "admin", adminData:adminData };
                    }else{
                        return { success: false, message: "Incorrect Password" };
                    }

               }else{
                return { success: false, message: "Email incorrect" };
               }

        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error saving user:${error.message}`);
          }
          throw error;
        }
      }

}