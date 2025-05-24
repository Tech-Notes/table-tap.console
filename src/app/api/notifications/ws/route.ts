// app/api/ws-auth/route.ts
import {generateHMACSignature} from '@/hmacSignature';
import {getServerSession} from 'next-auth';
import {NextRequest, NextResponse} from 'next/server';
import {authOptions} from '../../auth/[...nextauth]/authOptions';

export async function GET(req: NextRequest) {
  const {searchParams, pathname} = req.nextUrl;
  const apiUrl =
    process.env.API_BASE +
    pathname.replace('/api', '') +
    (searchParams.toString() ? `?${searchParams.toString()}` : '');

  const url = new URL(apiUrl);
  const serverSession = await getServerSession(authOptions);
  const requestInfo = `URL:${url.pathname}${url.search}`;
  const email = serverSession?.email;
  const signature = generateHMACSignature(requestInfo);

  return NextResponse.json({email, signature});
}
