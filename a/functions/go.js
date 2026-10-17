// Cloudflare Pages Function: deploy at functions/go.js
// Set the TRACKING_DESTINATION secret in Cloudflare Pages settings.
export async function onRequestGet({ request, env }) {
  if (!env.TRACKING_DESTINATION) {
    return new Response('Redirect is not configured', { status: 503 });
  }
  const destination = new URL(env.TRACKING_DESTINATION);
  if (destination.protocol !== 'https:') {
    return new Response('Invalid redirect configuration', { status: 500 });
  }
  const incoming = new URL(request.url);
  const params = new URLSearchParams();
  for (let i = 1; i <= 5; i++) {
    const key = `sub${i}`;
    const value = incoming.searchParams.get(key) || incoming.searchParams.get(`s${i}`);
    if (value) params.set(key, value);
  }
  incoming.searchParams.forEach((value, key) => {
    if (!value || key === 'dest' || /^s[1-5]$/.test(key) || /^sub[1-5]$/.test(key)) return;
    params.append(key, value);
  });
  params.forEach((value, key) => destination.searchParams.append(key, value));
  return new Response(null, {
    status: 302,
    headers: {
      Location: destination.toString(),
      'Cache-Control': 'no-store, private',
      'Referrer-Policy': 'no-referrer'
    }
  });
}
