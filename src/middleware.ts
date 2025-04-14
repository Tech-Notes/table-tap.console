import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const mAuth = withAuth(
    function middleware() {
        return NextResponse.next();
    },
    {
        callbacks: {
            async authorized({ token }) {
                // If token is not present, user is not authenticated
                if (!!token) {
                    return true;
                }

                // If token is present, user is authenticated
                return false;
            }
        },
        pages: {
            signIn: "/signin"
        }
    }
)

export default mAuth;