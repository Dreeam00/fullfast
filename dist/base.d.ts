/**
 * BaseFast v2.5: Professional Atomic File System.
 * Uses Origin Private File System (OPFS) for actual file-based storage.
 */
export declare class BaseFast {
    private data;
    private filename;
    constructor(data?: any[]);
    /**
     * Connect to an actual file in OPFS
     */
    static connect(filename: string): Promise<BaseFast>;
    static from(data: any[]): BaseFast;
    /**
     * Load JSON from OPFS file
     */
    load(): Promise<void>;
    /**
     * Atomic Save to OPFS file
     */
    save(newData?: any[]): Promise<void>;
    select(fields: string | string[]): this;
    where(predicate: (item: any) => boolean): this;
    orderBy(field: string, direction?: 'asc' | 'desc'): this;
    limit(count: number): this;
    exec(): Promise<any[]>;
    all(): any[];
}
//# sourceMappingURL=base.d.ts.map