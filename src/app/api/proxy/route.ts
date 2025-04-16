import {generateHMACSignature} from '@/hmacSignature';
import {getServerSession} from 'next-auth';
import {NextRequest} from 'next/server';
import {authOptions} from '../auth/[...nextauth]/authOptions';

async function handler(req: NextRequest) {
  const {searchParams, pathname} = req.nextUrl;
  // console.log('proxy url', url, pathname);
  const apiUrl =
    process.env.API_BASE +
    pathname.replace('/api', '') +
    (searchParams.toString() ? `?${searchParams.toString()}` : '');

  const url = new URL(apiUrl);
  const serverSession = await getServerSession(authOptions);
  const headers = new Headers(req.headers);
  const requestInfo = `URL:${url.pathname}${url.search}`;
  headers.set('Host', url.host);
  headers.set('X-Forwarded-Host', url.host);
  headers.set('X-HMAC-SIGNATURE', generateHMACSignature(requestInfo));
  headers.set('X-USER-EMAIL', serverSession?.email as string);

  // we need to use half duplex mode to send body as stream
  const opts = {
    duplex: 'half',
  };

  let requestBody: string | ReadableStream<Uint8Array> | undefined | null;

  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    if (req.headers.get('content-type') === 'application/json') {
      requestBody = await req.text();
    } else {
      requestBody = req.body;
    }
  }

  const response = await fetch(apiUrl, {
    method: req.method,
    headers,
    body: requestBody,
    ...opts,
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
