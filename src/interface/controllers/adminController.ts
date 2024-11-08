import {AdminService} from "../../application/use-case/admin"
import { LoginAdmin } from "../../domain/entities/IAdmin";

class AdminController {
    private adminService: AdminService

    constructor() {
        this.adminService = new AdminService()
    }


    async loginAdmin(call: any, callback: any): Promise<void>{
        try{
            console.log("reached-------------------------------------------", call.request);

            const { email, password } = call.request;

            await this.adminService.loginAdmin({ email, password }, callback);
        }catch(error){
            console.log("error in login user usercontroller", error);
        }

    }


    
    


}

export const adminController = new AdminController()