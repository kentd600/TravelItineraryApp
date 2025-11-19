export interface ControllerResult<T> {
    success: boolean;
    error: Error | null;
    data: T | null;
}
export declare function controllerResult<T>(data: T | null, success?: boolean, error?: null | Error): ControllerResult<T>;
//# sourceMappingURL=ControllerUtility.d.ts.map