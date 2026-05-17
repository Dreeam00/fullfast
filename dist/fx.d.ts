/**
 * QueryFast FX: Modular extensions for the Atomic DOM Engine.
 */
export declare const FX: {
    /**
     * Animation & Transition presets
     */
    motion: {
        fadeIn: (el: any, duration?: number) => any;
        fadeOut: (el: any, duration?: number) => any;
        slideIn: (el: any, { x, y, duration }?: {
            x?: number | undefined;
            y?: number | undefined;
            duration?: number | undefined;
        }) => any;
        shake: (el: any, duration?: number) => any;
    };
    /**
     * Atomic Form Helper
     */
    form: (initial: Record<string, any>) => {
        state: any;
        bind: (name: string) => {
            on: (el: any) => void;
        };
    };
    /**
     * Simple Store Pattern
     */
    store: (initial: any) => any;
};
//# sourceMappingURL=fx.d.ts.map