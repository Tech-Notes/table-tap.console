import * as crypto from 'crypto';
import 'server-only';

function generateHMACSignature(data: string): string {
  const secretAPIKey = process.env.SECRET_API_KEY!;
  const hmac = crypto.createHmac('sha256', secretAPIKey);
  const signature = hmac.update(data).digest('hex');
  return signature;
}

export {generateHMACSignature};
