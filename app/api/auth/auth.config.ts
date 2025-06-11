import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email ve şifre gerekli');
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user) {
            console.log('Kullanıcı bulunamadı:', credentials.email);
            throw new Error('Kullanıcı bulunamadı');
          }

          console.log('Kullanıcı bulundu:', {
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin
          });

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log('Şifre kontrolü:', {
            isValid: isPasswordValid,
            providedPassword: credentials.password,
            hashedPassword: user.password
          });

          if (!isPasswordValid) {
            throw new Error('Geçersiz şifre');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isAdmin: user.isAdmin
          };
        } catch (error) {
          console.error('Giriş hatası:', error);
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role || 'USER',
          isAdmin: user.isAdmin || false
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          isAdmin: token.isAdmin
        }
      };
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
}; 