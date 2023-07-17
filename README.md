# random-pool

[https://github.com/NiuWeb/random-pool](https://github.com/NiuWeb/random-pool)

Picks random elements from a pool.

## Usage
The basic usage of the library is the following:

```ts
import { RandomPool } from "@bygdle/random-pool"
const pool = new RandomPool({
  values: [["A", 50], ["B", 25], ["C", 25]],
})

// A has 50% chance of being picked
// B and C have 25% chance of being picked
const picked = pool.pick() 
```
The weights of the items does not have to add up to 100, the probability is computed based on the sum of the weights:

```ts
import { RandomPool } from "@bygdle/random-pool"
const pool = new RandomPool({
  values: [["A", 100], ["B", 50], ["C", 50]],
})

// A has 50% chance of being picked
// B and C have 25% chance of being picked
const picked = pool.pick() 
```

## Dependent pools
You can configure the pool to remove items when they are picked, so it behaves like a dependent random variable:

```ts
import { RandomPool } from "@bygdle/random-pool"
const pool = new RandomPool({
  values: [["A", 100], ["B", 50], ["C", 50]],
  dependent: true
})

// At the first pick:
// A has 50% chance of being picked
// B and C have 25% chance of being picked
pool.pick() 

// At the second pick:
// If A was picked at the first pick ->
//   B and C have 50% chance of being picked
// If B or C were picked at the first pick ->
//   A has 75% chance of being picked, 
//   and the other one has 25% chance of being picked
pool.pick()

// At the third pick:
// The only remaining item is picked
pool.pick()

// At the fourth pick:
// The pool is empty, and an error is thrown
pool.pick()
```
