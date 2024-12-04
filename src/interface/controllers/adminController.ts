import {AdminService} from "../../application/use-case/admin"
import { AdminLoginRequest,AdminLoginResponse } from "../../domain/entities/IAdmin";
import grpc from '@grpc/grpc-js';
class AdminController {
    private adminService: AdminService

    constructor() {
        this.adminService = new AdminService()
    }


    async loginAdmin(
        call: grpc.ServerUnaryCall<AdminLoginRequest, AdminLoginResponse>,
        callback: (error: any, response: AdminLoginResponse| null) => void): Promise<void> {
        try {
          console.log("Reached-------------------------------------------", call.request);
      
          const { email, password } = call.request;
      
          // Call the admin service method with extracted email and password
          await this.adminService.loginAdmin({ email, password }, callback);
        } catch (error) {
          console.error("Error in loginAdmin function:", error);
      
          return callback({
            code: grpc.status.INTERNAL,
            message: error instanceof Error ? error.message : 'Unknown error occurred',
          }, null);
        }
      }
      

    
    


}

export const adminController = new AdminController()