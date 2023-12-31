import { RandomPool } from "./pool"


test("dependent pool removes picked items", () => {
    RandomPool.random = () => 0
    const pool = new RandomPool({
        values: [["A", 1], ["B", 1], ["C", 1]],
        dependent: true
    })

    expect(pool.pick()).toBe("A")
    expect(pool.pick()).toBe("B")
    expect(pool.pick()).toBe("C")

    expect(pool.length).toBe(0)
})

test("independent pool does not remove picked items", () => {
    RandomPool.random = () => 0
    const pool = new RandomPool({
        values: [["A", 1], ["B", 1], ["C", 1]],
        dependent: false
    })

    expect(pool.pick()).toBe("A")
    expect(pool.pick()).toBe("A")
    expect(pool.pick()).toBe("A")

    expect(pool.length).toBe(3)
})



test("weighted pool picks items with correct probability", () => {
    RandomPool.random = () => 0.5
    const pool = new RandomPool({
        values: [["A", 2], ["B", 3], ["C", 4]],
        dependent: true,
    })

    // AABB B CCCC
    expect(pool.pick()).toBe("B")
    // AAC|CCC
    expect(pool.pick()).toBe("C")
    // AA
    expect(pool.pick()).toBe("A")

    expect(pool.length).toBe(0)
})