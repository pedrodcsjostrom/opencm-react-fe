
export interface User {
  id: string;
  username: string;
  email: string;
  roles: AppRole[];
  createdAt: Date;
  updatedAt: Date;
};

export interface AppRole {
  ID: string;
  Name: string;
}

export interface Session {
  ID: string;
  UserId: string;
  ExpiresAt: Date;
  CreatedAt: Date;
  UpdatedAt: Date;
}
  
export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}

export interface LoginResponse {
  User: User;
  Session: Session;
}

