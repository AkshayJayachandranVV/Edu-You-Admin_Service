export interface AdminLoginRequest {
    email: string;
    password: string;
  }
  
  export interface AdminLoginResponse {
    success: boolean;
    message: string;
    role?: string;
    adminData?: AdminData;
  }
  
  export interface AdminData {
    id: string;
    email: string;
    role: string;
  }
  

  