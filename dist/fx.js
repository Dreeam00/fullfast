/**
 * QueryFast FX: Modular extensions for the Atomic DOM Engine.
 */
export const FX = {
    /**
     * Animation & Transition presets
     */
    motion: {
        fadeIn: (el, duration = 300) => (el[0] || el).animate([{ opacity: 0 }, { opacity: 1 }], { duration, fill: 'forwards' }).finished,
        fadeOut: (el, duration = 300) => (el[0] || el).animate([{ opacity: 1 }, { opacity: 0 }], { duration, fill: 'forwards' }).finished,
        slideIn: (el, { x = 0, y = 20, duration = 300 } = {}) => (el[0] || el).animate([
            { opacity: 0, transform: `translate(${x}px, ${y}px)` },
            { opacity: 1, transform: 'translate(0, 0)' }
        ], { duration, fill: 'forwards', easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }).finished,
        shake: (el, duration = 400) => (el[0] || el).animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
        ], { duration }).finished
    },
    /**
     * Atomic Form Helper
     */
    form: (initial) => {
        const state = window.Q.state(initial);
        return {
            state,
            bind: (name) => ({
                on: (el) => {
                    el.on('input', (e) => state.value = { ...state.value, [name]: e.value });
                    el[0].value = state.value[name] || '';
                }
            })
        };
    },
    /**
     * Simple Store Pattern
     */
    store: (initial) => window.Q.state(initial)
};
// Global export
if (typeof window !== 'undefined') {
    window.FX = FX;
}
//# sourceMappingURL=fx.js.map