/**
 * WebFast v3.0: The Unified Entry Point.
 */
import { Q, QCollection } from './index';
import { RootingFast } from './rooting';
import { BaseFast } from './base';
import { FX } from './fx';
const WebFast = {
    Q,
    QCollection,
    Router: RootingFast,
    DB: BaseFast,
    FX
};
if (typeof window !== 'undefined') {
    window.WebFast = WebFast;
    // Keep legacy globals for transition
    window.Q = Q;
    window.RootingFast = RootingFast;
    window.BaseFast = BaseFast;
    window.FX = FX;
}
export { Q, QCollection, RootingFast as Router, BaseFast as DB, FX };
export default WebFast;
//# sourceMappingURL=webfast.js.map