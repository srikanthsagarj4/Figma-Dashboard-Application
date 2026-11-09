export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth endpoints)
     * - api/dashboard (public data fallback endpoints if needed)
     * - login (auth page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, icons
     */
    "/((?!api/auth|api/dashboard|login|_next/static|_next/image|favicon.ico|figma_).*)",
  ],
};
