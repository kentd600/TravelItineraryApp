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
    advanced: {
        defaultCookieAttributes: {
            httpOnly: true;
            secure: true;
            sameSite: "none";
            partitioned: true;
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map