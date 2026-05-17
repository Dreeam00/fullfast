/**
 * RootingFast: The backbone of QueryFast ecosystem.
 */
interface RouteContext {
    params: Record<string, string>;
    path: string;
}
type PageFunction = (ctx: RouteContext, scp: any) => Promise<any> | any;
export declare class RootingFast {
    private static routes;
    private static scp;
    private static currentCleanup;
    static route(routes: Record<string, PageFunction>): void;
    private static navigate;
    private static match;
    static go(path: string): void;
}
export {};
//# sourceMappingURL=rooting.d.ts.map