/** a single item in the pool */
export type PoolItem<V> = [value: V, probability: number];
/** options to initialize the random pool */
export interface PoolOptions<V> {
    /** list of values to initialize the pool with */
    values?: PoolItem<V>[];
    /** if true, items will be removed from the pool once selected */
    dependent?: boolean;
    /**
     * The random() function, used to pick a random number between 0 and 1.
     * If not provided, Math.random() will be used.
     */
    random?(): number;
}
/**
 * A random pool that allows you to pick a random item from a list of items
 * with a given probability.
 */
export declare class RandomPool<V> {
    private basePool;
    private pool;
    private weight;
    private random;
    /**
     * if true, items will be removed from the pool once selected
     */
    dependent: boolean;
    /**
     * Creates a new random pool
     */
    constructor({ values, dependent, random }: PoolOptions<V>);
    /**
     * Updates the pool with a new list of items
     * @param pool the new pool to use
     */
    update(pool: PoolItem<V>[]): void;
    /**
     * Resets the pool to its initial state
     */
    reset(): void;
    /**
     * Returns the number of items in the pool
     */
    get length(): number;
    /**
     * Returns a random item from the pool. If the pool is empty, a RangeError is thrown.
     * @returns a random item from the pool
     */
    pick(): V;
    /**
     * Returns a random number between min and max
     * @param min The minimum value
     * @param max The maximum value
     * @returns a random number between min and max
     */
    static range(min: number, max: number, random?: () => number): number;
    /**
     * Normalizes a pool of items so that the sum of all weights is 1.
     * It DOES mutate the input pool.
     * @param pool The pool to normalize
     * @param total The total weight of the pool. If not provided, it will be calculated
     * from the pool.
     * @returns The same input pool
     */
    static normalize<V>(pool: PoolItem<V>[], total?: number): PoolItem<V>[];
}
//# sourceMappingURL=pool.d.ts.map