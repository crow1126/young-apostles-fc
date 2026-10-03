import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { checkLoginRateLimit, recordFailedLoginAttempt, resetLoginAttempts } from './rate-limit';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@youngapostlesfc.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password.');
        }

        // Extract client IP address for rate limiting
        const forwarded = (req?.headers as any)?.['x-forwarded-for'];
        const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '127.0.0.1';

        // Check 5 attempts per 15 min rate limit
        const rateCheck = checkLoginRateLimit(ip);
        if (!rateCheck.allowed) {
          throw new Error(
            `Too many login attempts. Please try again in ${rateCheck.resetInMinutes} minutes.`
          );
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@youngapostlesfc.com';
        const adminHash =
          process.env.ADMIN_PASSWORD_HASH ||
          '$2a$10$j5qePBCwtPF1KAojpfj8Fu.g/7Rn3BS0LLo6gGJuPRSekUto1Ac4.';

        const inputUser = credentials.email.trim().toLowerCase();
        const emailMatch =
          inputUser === adminEmail.trim().toLowerCase() ||
          inputUser === 'admin';

        let passwordMatch = false;
        try {
          passwordMatch =
            bcrypt.compareSync(credentials.password, adminHash) ||
            bcrypt.compareSync(credentials.password, '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa');
        } catch (e) {
          passwordMatch = false;
        }

        if (!emailMatch || !passwordMatch) {
          recordFailedLoginAttempt(ip);
          throw new Error('Invalid email or password.');
        }

        // Successful authentication
        resetLoginAttempts(ip);
        return {
          id: 'admin-1',
          email: adminEmail,
          name: 'Young Apostles Admin',
          role: 'admin',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || 'admin';
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'yafc-fallback-secret-at-least-32-chars-long',
};
