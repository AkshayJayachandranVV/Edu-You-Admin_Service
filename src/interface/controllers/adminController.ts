import {AdminService} from "../../application/use-case/admin"
import { LoginAdmin } from "../../domain/entities/IAdmin";

class AdminController {
    private adminService: AdminService

    constructor() {
        this.adminService = new AdminService()
    }


    async loginAdmin(data: LoginAdmin){
        try{
            console.log(data, "login user");

            const result = await this.adminService.loginAdmin(data)

            return result
        }catch(error){
            console.log("error in login user usercontroller", error);
        }

    }


}

export const adminController = new AdminController()