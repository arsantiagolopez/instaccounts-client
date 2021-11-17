import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

interface ServerAndFrom {
  server: string | undefined;
  from: string | undefined;
}

// Email provider server & from fields
const { server, from }: ServerAndFrom = {
  server:
    process.env.NODE_ENV === "development"
      ? process.env.TEST_SERVER_STRING
      : // @todo: delete line below when app's finished
        // : process.env.SENGRID_SERVER_STRING,
        process.env.TEST_SERVER_STRING,
  from:
    process.env.NODE_ENV === "development"
      ? process.env.TEST_EMAIL_FROM
      : // @todo: delete line below when app's finished
        // : {
        //     email: process.env.SENDGRID_EMAIL_FROM,
        //     name: "Flavors",
        //   },
        process.env.TEST_EMAIL_FROM,
};

export default async function auth(
  req: NextApiRequest & NextAuthOptions,
  res: NextApiResponse<any>
) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      // Magic link login
      EmailProvider({
        server,
        from,
        sendVerificationRequest: async () => {},
      }),
      // Google one-click login
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        profile(profile) {
          return {
            id: profile?.sub,
            name: profile?.name,
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            email: profile?.email,
            image: profile?.picture,
          };
        },
      }),
    ],
    secret: process.env.SECRET,
    session: {
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 60 * 60 * 24 * 30, // 1 month
      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      updateAge: 60 * 60 * 24 * 30, // 1 month
    },
    pages: {
      signIn: "/",
      error: "/",
    },
    // Cookies only accessible from HTTPS URLS
    useSecureCookies: process.env.NODE_ENV !== "development",
    // Production only cookie modifiers
    cookies:
      process.env.NODE_ENV !== "development"
        ? {
            sessionToken: {
              name: `__Secure-next-auth.session-token`,
              options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: true,
                domain: process.env.DOMAIN,
              },
            },
          }
        : undefined,
    // Debugging
    debug: true,
  });
}
