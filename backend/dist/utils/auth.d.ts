export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth/adapters/mongodb").DBAdapter<import("better-auth").BetterAuthOptions>;
    emailAndPassword: {
        enabled: true;
    };
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
        };
    };
    trustedOrigins: string[];
    defaultCookieAttributes: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: string;
    };
    crossOriginCookies: {
        enabled: boolean;
    };
}>;
//# sourceMappingURL=auth.d.ts.map