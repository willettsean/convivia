import type { NextAuthConfig } from 'next-auth'

// Edge-compatible config — no Node.js-only imports (no bcrypt, no Prisma)
export const authConfig: NextAuthConfig = {
  pages: { signIn: '/login' },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPortal = nextUrl.pathname.startsWith('/portal')
      const isAdmin = nextUrl.pathname.startsWith('/admin')

      if (isPortal) {
        return isLoggedIn
      }
      if (isAdmin) {
        if (!isLoggedIn) return false
        if ((auth?.user as any)?.role !== 'admin') {
          return Response.redirect(new URL('/login', nextUrl))
        }
        return true
      }
      return true
    },
    jwt({ token, user }) {
      if (user) { token.id = user.id; token.role = (user as any).role }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role
      }
      return session
    },
  },
  providers: [], // providers added in auth.ts only
}
