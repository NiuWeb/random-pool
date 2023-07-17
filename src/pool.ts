/** a single item in the pool */
export type PoolItem<V> = [value: V, probability: number]
/** options to initialize the random pool */
export interface PoolOptions<V> {
    /** list of values to initialize the pool with */
    values?: PoolItem<V>[]
    /** if true, items will be removed from the pool once selected */
    dependent?: boolean
    /** 
     * The random() function, used to pick a random number between 0 and 1.
     * If not provided, Math.random() will be used.
     */
    random?(): number
}

/**
 * A random pool that allows you to pick a random item from a list of items
 * with a given probability.
 */
export class RandomPool<V> {
    private basePool: PoolItem<V>[] = []
    private pool: PoolItem<V>[] = []
    private weight = 0
    private random = Math.random
    /**
     * if true, items will be removed from the pool once selected
     */
    public dependent = false
    /**
     * Creates a new random pool
     */
    constructor({ values = [], dependent = false, random = Math.random }: PoolOptions<V>) {
        this.basePool = values
        this.update(values)
        this.dependent = dependent
        this.random = random
    }

    /**
     * Updates the pool with a new list of items
     * @param pool the new pool to use
     */
    public update(pool: PoolItem<V>[]): void {
        this.basePool = pool
        this.reset()
    }

    /**
     * Resets the pool to its initial state
     */
    public reset(): void {
        this.pool = [...this.basePool]
        this.weight = 0
        for (const [, w] of this.pool) {
            this.weight += w
        }
    }

    /**
     * Returns the number of items in the pool
     */
    public get length(): number {
        return this.pool.length
    }

    /**
     * Returns a random item from the pool. If the pool is empty, a RangeError is thrown.
     * @returns a random item from the pool
     */
    public pick() {
        const picked = RandomPool.range(0, this.weight, this.random)

        let sum = 0
        for (let i = 0; i < this.pool.length; i++) {
            const [value, weight] = this.pool[i]

            sum += weight
            if (picked <= sum) {
                if (this.dependent) {
                    this.pool.splice(i, 1)
                    this.weight -= weight
                }
                return value
            }
        }

        throw new RangeError("Pool is already empty")
    }

    /**
     * Returns a random number between min and max
     * @param min The minimum value
     * @param max The maximum value
     * @returns a random number between min and max
     */
    public static range(min: number, max: number, random = Math.random): number {
        return min + (max - min) * random()
    }

    /**
     * Normalizes a pool of items so that the sum of all weights is 1.
     * It DOES mutate the input pool.
     * @param pool The pool to normalize
     * @param total The total weight of the pool. If not provided, it will be calculated
     * from the pool.
     * @returns The same input pool
     */
    public static normalize<V>(pool: PoolItem<V>[], total?: number): PoolItem<V>[] {
        const sum =total ?? pool.reduce((acc, [, w]) => acc + w, 0)
        for (let i = 0; i < pool.length; i++) {
            pool[i][1] /= sum
        }
        return pool
    }
}