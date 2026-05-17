/**
 * WebFast v3.0: The Unified Entry Point.
 */
import { Q, QCollection } from './index';
import { RootingFast } from './rooting';
import { BaseFast } from './base';
import { FX } from './fx';
declare const WebFast: {
    Q: typeof Q;
    QCollection: typeof QCollection;
    Router: typeof RootingFast;
    DB: typeof BaseFast;
    FX: {
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
        form: (initial: Record<string, any>) => {
            state: any;
            bind: (name: string) => {
                on: (el: any) => void;
            };
        };
        store: (initial: any) => any;
    };
};
export { Q, QCollection, RootingFast as Router, BaseFast as DB, FX };
export default WebFast;
//# sourceMappingURL=webfast.d.ts.map