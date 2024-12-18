import { type DefaultSession } from "next-auth";

import { env } from "@/env";
import { db } from "@/server/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
// import PasskeyProvider from "next-auth/providers/passkey";
import ResendProvider from "next-auth/providers/resend";
import { Resend } from "resend";
import SignInEmail from "@/components/emails/signInEmail";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { $Enums, User } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			role: $Enums.Role;
		} & DefaultSession["user"];
	}
}

const resend = new Resend(env.AUTH_RESEND_KEY);

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [
		GoogleProvider,
		DiscordProvider,
		GithubProvider,
		ResendProvider({
			from: "signin@resend.dev",
			async sendVerificationRequest({ identifier: email, url }) {
				const result = await resend.emails.send({
					from: "TEDI <signin@tedinitiative.org>",
					to: [email],
					subject: "Sign in to TEDI",
					react: SignInEmail({ url }),
				});
				if (result.error ?? !result.data) throw new Error(`Could not send email: ${result.error?.message}`);
			},
		}),
		// PasskeyProvider,
	],
	callbacks: {
		async session({ session, user }) {
			/* eslint-disable no-param-reassign */
			session.user.id = user.id;
			session.user.role = (user as unknown as User).role;
			/* eslint-enable no-param-reassign */
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	pages: {
		signIn: "/signin",
		// verifyRequest: "/verify",
		error: "/error",
	},
	secret: env.NEXTAUTH_SECRET,
	debug: false, // env.NODE_ENV === "development",
	experimental: { enableWebAuthn: true },
});
