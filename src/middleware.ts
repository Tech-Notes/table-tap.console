import {withAuth} from 'next-auth/middleware';
import {NextRequest, NextResponse} from 'next/server';

const mAuth = withAuth(
  function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;
    if (pathname.startsWith('/api')) {
      const url = req.nextUrl.clone();
      url.pathname = '/api/proxy';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized({token}) {
        // If token is present, user is authenticated
        if (!!token) {
          return true;
        }
        // If token is not present, user is not authenticated
        return false;
      },
    },
    pages: {
      signIn: '/signin',
    },
  },
);

export default mAuth;
