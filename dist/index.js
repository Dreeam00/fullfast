export class QCollection extends Array {
    constructor(i = []) {
        super(...i);
        Object.setPrototypeOf(this, QCollection.prototype);
    }
    get parent() { return this[0]; }
    el(a, ...args) {
        if (typeof a === 'string') {
            const n = Q.add(a);
            this[0]?.appendChild(n[0]);
            return n;
        }
        return a(this, ...args);
    }
    add(s) {
        const { id, classes } = p(s);
        this.forEach(el => {
            if (id)
                el.id = id;
            classes.forEach(c => el.classList.add(c));
        });
        return this;
    }
    rm(s) {
        const { id, classes } = p(s);
        this.forEach(el => {
            if (id && el.id === id)
                el.id = '';
            classes.forEach(c => el.classList.remove(c));
        });
        return this;
    }
    set(s) {
        const { id, classes } = p(s);
        this.forEach(el => {
            if (id)
                el.id = id;
            el.className = classes.join(' ');
        });
        return this;
    }
    fx(a, o) {
        const el = this[0];
        if (!el)
            return Promise.resolve(this);
        if (typeof a === 'object') {
            return new Promise(r => el.animate(a, o || { duration: 300, fill: 'forwards' }).onfinish = () => r(this));
        }
        this.add(a);
        return new Promise(r => {
            const f = (e) => { if (e.target === el) {
                el.removeEventListener('transitionend', f);
                el.removeEventListener('animationend', f);
                r(this);
            } };
            el.addEventListener('transitionend', f);
            el.addEventListener('animationend', f);
            if (parseFloat(getComputedStyle(el).transitionDuration) === 0)
                setTimeout(() => r(this), 20);
        });
    }
    wait(ms) { return new Promise(r => setTimeout(() => r(this), ms)); }
    text(v) {
        if (v === undefined)
            return this[0]?.textContent || '';
        this.forEach(e => e.textContent = v);
        return this;
    }
    appendTo(t) {
        const p = typeof t === 'string' ? document.querySelector(t) : (t[0] || t);
        this.forEach(e => p?.appendChild(e));
        return this;
    }
    html(v) {
        if (v === undefined)
            return this[0]?.innerHTML || '';
        this.forEach(e => e.innerHTML = v);
        return this;
    }
    attr(n, v) {
        if (arguments.length === 1)
            return this[0]?.getAttribute(n);
        this.forEach(e => (v == null || v === false) ? e.removeAttribute(n) : e.setAttribute(n, v));
        return this;
    }
    on(t, h) {
        this.forEach(e => {
            if (t === 'hover') {
                e.addEventListener('mouseenter', ev => h(e, true, ev));
                e.addEventListener('mouseleave', ev => h(e, false, ev));
            }
            else
                e.addEventListener(t, ev => h(e, ev));
        });
        return this;
    }
    ui(s) {
        const kMap = { bg: 'background', text: 'color' };
        this.forEach((e) => {
            for (const k in s)
                e.style[kMap[k] || k] = s[k];
        });
        return this;
    }
    bind(s, m, mode) {
        const f = (v) => {
            const r = m(v);
            if (mode === 'text')
                this.text(r);
            else if (mode === 'html')
                this.html(r);
            else if (mode === 'attr')
                for (const k in r)
                    this.attr(k, r[k]);
            else if (mode === 'class')
                for (const k in r)
                    this.forEach(e => r[k] ? e.classList.add(k) : e.classList.remove(k));
            else if (mode === 'css')
                this.ui(r);
        };
        s._subscribe(f);
        return this;
    }
}
export function Q(s) {
    if (s instanceof QCollection)
        return s;
    const i = typeof s === 'string' ? Array.from(document.querySelectorAll(s)) : (Array.isArray(s) ? s : [s]);
    return new QCollection(i.filter(Boolean));
}
const pCache = new Map();
const p = (s) => {
    if (pCache.has(s))
        return pCache.get(s);
    const m = s.match(/^([a-z0-9-]+)?(?:#([a-z0-9-]+))?((?:\.[a-z0-9-]+)*)$/i) || [];
    const parsed = { tag: m[1] || '', id: m[2] || '', classes: m[3] ? m[3].split('.').filter(Boolean) : [] };
    pCache.set(s, parsed);
    return parsed;
};
const tMap = { sec: 'section', hdr: 'header', btn: 'button', art: 'article', spn: 'span', inp: 'input', ftr: 'footer' };
Q.add = (s) => {
    const { tag, id, classes } = p(s);
    const e = document.createElement(tMap[tag] || tag || 'div');
    if (id)
        e.id = id;
    classes.forEach(c => e.classList.add(c));
    return new QCollection([e]);
};
Q.state = (v) => {
    let subs = [];
    const o = {
        value: v,
        _subscribe(f) { subs.push(f); f(this.value); },
        _unsubscribe(f) { subs = subs.filter(s => s !== f); }
    };
    return new Proxy(o, {
        set(t, p, v) {
            if (p === 'value') {
                t.value = v;
                for (let i = 0; i < subs.length; i++)
                    subs[i](v);
            }
            else
                t[p] = v;
            return true;
        }
    });
};
Q.global = (css) => {
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
};
if (typeof window !== 'undefined') {
    window.Q = Q;
    window.QCollection = QCollection;
}
//# sourceMappingURL=index.js.map