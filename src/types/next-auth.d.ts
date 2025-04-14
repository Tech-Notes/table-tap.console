import "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    user_id: number;
    email: string;
    business_id: number;
    role: string;
    role_id: number;
  }

  interface User {
    id: string;
    user_id: number;
    email: string;
    business_id: number;
    role: string;
    role_id: number;
  }
}