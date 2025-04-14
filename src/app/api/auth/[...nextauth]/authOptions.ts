import {fetchJSON} from '@/base';
import {SignInRequest, SignInResponse, TokenClaims} from '@/types/types';
import {jwtDecode} from 'jwt-decode';
import {AuthOptions, Session, User} from 'next-auth';
import {JWT} from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({token, user}: {token: JWT; user: User | undefined}) {
      if (user) {
        token.id = user.id;
        token.user_id = user.user_id;
        token.email = user.email;
        token.business_id = user.business_id;
        token.role = user.role;
        token.role_id = user.role_id;
      }
      return token;
    },
    async session({session, token}: {session: Session; token: JWT}) {
      session.id = token.id as string;
      session.user_id = token.user_id as number;
      session.email = token.email as string;
      session.business_id = token.business_id as number;
      session.role = token.role as string;
      session.role_id = token.role_id as number;
      return {...session};
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'email', type: 'text', placeholder: 'email'},
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        const data: SignInRequest = {
          email: credentials?.email || '',
          password: credentials?.password || '',
        };
        const resp = await fetchJSON<SignInResponse, SignInRequest>(
          `${process.env.API_BASE}/signin`,
          {},
          data,
          'POST',
        );

        if (resp.status === 'error') {
          return null;
        }

        const {token} = resp.data;

        if (!token) {
          return null;
        }
        const {user_email, user_id, business_id, role, role_id} =
          jwtDecode<TokenClaims>(token);

        return {
          id: user_email,
          user_id: user_id,
          email: user_email,
          business_id: business_id,
          role: role,
          role_id: role_id,
        };
      },
    }),
  ],
};
