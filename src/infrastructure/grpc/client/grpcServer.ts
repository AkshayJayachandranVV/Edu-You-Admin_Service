import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { adminController } from '../../../interface/controllers/adminController';
import config from '../../config/config';

const ADMIN_PROTO_PATH = path.resolve(__dirname, '../proto/admin.proto');

const adminPackageDefinition = protoLoader.loadSync(ADMIN_PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});



const adminProtoDescription = grpc.loadPackageDefinition(adminPackageDefinition) as any;

const adminProto = adminProtoDescription.admin;

const server = new grpc.Server();

server.addService(adminProto.AdminService.service, {
    login: adminController.loginAdmin.bind(adminController),
});

const startGrpcServer = () => {
    const grpcPort = config.grpcPort || 4001; // Assign port 4001 or from config
    server.bindAsync(`0.0.0.0:${grpcPort}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
        if (err) {
            console.error("Failed to start gRPC server:", err);
        } else {
            console.log(`gRPC server running on port: ${grpcPort}`);
        }
    });
};

startGrpcServer();

export { startGrpcServer };