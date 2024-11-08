export interface LoginAdmin {
    email: string;
    password: string;
}

export interface adminData {
    id: string;
    email: string;
    role: string;
}

// Define the response type for the login method
export interface LoginAdminResponse {
    success: boolean;
    message: string;
    role?: string;
    adminData?: adminData;
}
