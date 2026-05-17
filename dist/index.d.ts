export declare class QCollection extends Array<Element> {
    constructor(i?: Element[]);
    get parent(): Element;
    el(a: any, ...args: any[]): any;
    add(s: string): this;
    rm(s: string): this;
    set(s: string): this;
    fx(a: any, o?: any): Promise<this>;
    wait(ms: number): Promise<this>;
    text(v?: string): any;
    appendTo(t: any): this;
    html(v?: string): any;
    attr(n: string, v?: any): any;
    on(t: string, h: any): this;
    ui(s: any): this;
    bind(s: any, m: any, mode: string): this;
}
export declare function Q(s: any): QCollection;
export declare namespace Q {
    var add: (s: string) => QCollection;
    var state: (v: any) => {
        value: any;
        _subscribe(f: any): void;
        _unsubscribe(f: any): void;
    };
    var global: (css: string) => void;
}
//# sourceMappingURL=index.d.ts.map