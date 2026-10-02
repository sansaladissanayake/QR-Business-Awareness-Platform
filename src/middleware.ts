import { clerkMiddleware } from '@clerk/nextjs/server';

// Clerk middleware — initialises the Clerk session on every request.
// '/__clerk/:path*' is required for Clerk proxy verification on vercel.app domains.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Clerk proxy path — required for domain verification on vercel.app
    '/__clerk(.*)',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
