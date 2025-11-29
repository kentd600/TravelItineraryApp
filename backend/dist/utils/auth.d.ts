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
    plugins: [{
        id: "next-cookies";
        hooks: {
            after: {
                matcher(ctx: import("better-auth").EndpointContext<string, any> & Omit<import("better-auth").InputContext<string, any>, "method"> & {
                    context: import("better-auth").AuthContext & {
                        returned?: unknown;
                        responseHeaders?: Headers;
                    };
                    headers?: Headers;
                }): true;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<void>;
            }[];
        };
    }];
}>;
//# sourceMappingURL=auth.d.ts.map