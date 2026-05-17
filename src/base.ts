/**
 * BaseFast: Unified Atomic Storage System.
 * Supports: OPFS, IndexedDB, LocalStorage, ServerSync
 */

interface StorageProvider {
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
}

class OPFSProvider implements StorageProvider {
  async get(key: string) {
    const root = await navigator.storage.getDirectory();
    try {
      const fileHandle = await root.getFileHandle(key, { create: false });
      const file = await fileHandle.getFile();
      return JSON.parse(await file.text());
    } catch { return null; }
  }
  async set(key: string, value: any) {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle(key, { create: true });
    const writable = await (fileHandle as any).createWritable();
    await writable.write(JSON.stringify(value));
    await writable.close();
  }
}

class LocalStorageProvider implements StorageProvider {
  async get(key: string) { return JSON.parse(localStorage.getItem(key) || 'null'); }
  async set(key: string, value: any) { localStorage.setItem(key, JSON.stringify(value)); }
}

class ServerSyncProvider implements StorageProvider {
  constructor(private url: string) {}
  async get(key: string) {
    const res = await fetch(`${this.url}/${key}.json`);
    return res.ok ? await res.json() : null;
  }
  async set(key: string, value: any) {
    await fetch(`${this.url}/${key}.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value)
    });
  }
}

export class BaseFast {
  private data: any[] = [];
  private provider: StorageProvider;
  private key: string | null = null;

  constructor(provider: StorageProvider = new LocalStorageProvider()) {
    this.provider = provider;
  }

  static from(data: any[]) {
    const db = new BaseFast();
    (db as any).data = data;
    return db;
  }

  async connect(key: string) {
    this.key = key;
    this.data = (await this.provider.get(key)) || [];
    return this;
  }

  async save(newData?: any[]) {
    if (newData) this.data = newData;
    if (this.key) await this.provider.set(this.key, this.data);
  }

  // Data manipulation methods
  select(fields: string | string[]) {
    if (fields === '*') return this;
    const fieldList = Array.isArray(fields) ? fields : [fields];
    this.data = this.data.map(item => {
      const newItem: any = {};
      fieldList.forEach(f => newItem[f] = item[f]);
      return newItem;
    });
    return this;
  }

  where(predicate: (item: any) => boolean) {
    this.data = this.data.filter(predicate);
    return this;
  }

  all() { return this.data; }
}

// Global exposure
if (typeof window !== 'undefined') {
  (window as any).BaseFast = BaseFast;
  (window as any).BaseFastProviders = { OPFSProvider, LocalStorageProvider, ServerSyncProvider };
}
