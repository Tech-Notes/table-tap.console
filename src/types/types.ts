export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
}

export interface TokenClaims {
    user_id: number;
    user_email: string;
    business_id: number;
    role: string;
    role_id: number;
}

export interface PageProps {
  params: Record<string, any>;
  searchParams: {[key: string]: string | undefined};
}