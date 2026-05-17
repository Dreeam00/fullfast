/**
 * BaseFast v2.5: Professional Atomic File System.
 * Uses Origin Private File System (OPFS) for actual file-based storage.
 */
export class BaseFast {
    data = [];
    filename = null;
    constructor(data = []) {
        this.data = data;
    }
    /**
     * Connect to an actual file in OPFS
     */
    static async connect(filename) {
        const db = new BaseFast();
        db.filename = filename;
        await db.load();
        return db;
    }
    static from(data) {
        return new BaseFast(data);
    }
    /**
     * Load JSON from OPFS file
     */
    async load() {
        if (!this.filename)
            return;
        try {
            const root = await navigator.storage.getDirectory();
            const fileHandle = await root.getFileHandle(this.filename, { create: true });
            const file = await fileHandle.getFile();
            const text = await file.text();
            this.data = text ? JSON.parse(text) : [];
        }
        catch (e) {
            console.warn('BaseFast: Load failed, using empty data.', e);
            this.data = [];
        }
    }
    /**
     * Atomic Save to OPFS file
     */
    async save(newData) {
        if (newData)
            this.data = newData;
        if (!this.filename)
            return;
        try {
            const root = await navigator.storage.getDirectory();
            const fileHandle = await root.getFileHandle(this.filename, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(JSON.stringify(this.data));
            await writable.close();
        }
        catch (e) {
            console.error('BaseFast: Save failed.', e);
        }
    }
    select(fields) {
        if (fields === '*')
            return this;
        const fieldList = Array.isArray(fields) ? fields : [fields];
        this.data = this.data.map(item => {
            const newItem = {};
            fieldList.forEach(f => newItem[f] = item[f]);
            return newItem;
        });
        return this;
    }
    where(predicate) {
        this.data = this.data.filter(predicate);
        return this;
    }
    orderBy(field, direction = 'asc') {
        this.data.sort((a, b) => {
            const va = a[field];
            const vb = b[field];
            if (va < vb)
                return direction === 'asc' ? -1 : 1;
            if (va > vb)
                return direction === 'asc' ? 1 : -1;
            return 0;
        });
        return this;
    }
    limit(count) {
        this.data = this.data.slice(0, count);
        return this;
    }
    async exec() {
        return this.data; // Already async context usually
    }
    all() {
        return this.data;
    }
}
if (typeof window !== 'undefined') {
    window.BaseFast = BaseFast;
}
//# sourceMappingURL=base.js.map