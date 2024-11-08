import {adminController} from '../../interface/controllers/adminController';
import RabbitMQClient from './client';


export default class MessageHandlers{
     static async handle(operations:string,data : any, correlationId:string,replyTo:string){
        let response
        // switch(operations){
        //     case 'login_admin' :
        //         console.log('Handling operation',operations,data);
        //         response = await adminController.loginAdmin(data)
        //         console.log("data reached ",response);
        //         break;
        // }

        await RabbitMQClient.produce(response,correlationId,replyTo)
     }
}