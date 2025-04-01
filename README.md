# `shuffle-time`

`shuffle-time` is an advanced array shuffling library for JavaScript. Unlike conventional shuffling algorithms, which rely on statistical randomization, `shuffle-time` provides precise control over the shuffling process. It implements multiple techniques derived from real-world manual shuffling methods, offering configurable parameters such as pass count, chunk sizes, interleaving probabilities, and pile distribution.

## Rationale

Traditional shuffling algorithms produce statistically random results, but they do not exhibit the natural imperfections of manual shuffling. Research into physical card shuffling has demonstrated that human-controlled shuffling, when performed under controlled parameters, can yield randomness with desirable properties. `shuffle-time` incorporates these techniques to offer an alternative approach that may be preferable in scenarios requiring a more "natural" randomness.

## Installation

Install `shuffle-time` via npm:

```bash
npm install shuffle-time
```

## Usage

The package provides both asynchronous and synchronous versions of the shuffling functions. By default, importing from the package returns the asynchronous implementations.

### Asynchronous Shuffling

```mjs
import { overhandShuffle } from 'shuffle-time';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
overhandShuffle(array, { passes: 5 }).then(shuffledArray => {
  console.log(shuffledArray);
});
```

### Synchronous Shuffling

```mjs
import { faroShuffle } from 'shuffle-time/sync';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffledArray = faroShuffle(array, { passes: 3 });
console.log(shuffledArray);
```

## Available Methods

- **overhandShuffle:** Implements the overhand shuffle by repeatedly reversing portions of the array.
  - **Options:**
    - `passes` (number): Number of passes through the array (default: 10)
    - `minChunk` (number): Minimum chunk size (default: 1)
    - `maxChunk` (number): Maximum chunk size (default: 5)
    - `random` (function): Random function (default: Math.random)

- **riffleShuffle:** Splits the array into two halves and interleaves them.
  - **Options:**
    - `passes` (number): Number of passes (default: 5)
    - `interleaveProb` (number): Probability controlling interleaving (default: 0.5)
    - `splitRange` (number): Range for the random offset when splitting (default: 10)
    - `random` (function): Random function (default: Math.random)

- **hinduShuffle:** Emulates the Hindu shuffle with adjustable chunk sizes and insertion positions.
  - **Options:**
    - `passes` (number): Number of passes (default: 10)
    - `minChunk` (number): Minimum chunk size (default: 1)
    - `maxChunk` (number): Maximum chunk size (default: 5)
    - `random` (function): Random function (default: Math.random)

- **pileShuffle:** Distributes the array into several piles and recombines them in a randomized order.
  - **Options:**
    - `passes` (number): Number of passes (default: 1)
    - `numPiles` (number): Number of piles (default: 7)
    - `randomizePileOrder` (boolean): Whether to randomize the order of the piles (default: true)
    - `random` (function): Random function (default: Math.random)

- **stripShuffle:** Divides the array into uneven strips before randomly reordering them.
  - **Options:**
    - `passes` (number): Number of passes (default: 1)
    - `minChunk` (number): Minimum chunk size (default: 1)
    - `maxChunk` (number): Maximum chunk size (default: 5)
    - `random` (function): Random function (default: Math.random)

- **faroShuffle:** Performs a near-perfect Faro shuffle by interleaving the two halves of the array.
  - **Options:**
    - `passes` (number): Number of passes (default: 1)
    - `imperfect` (boolean): Whether to use imperfect interleaving (default: true)
    - `interleaveOffset` (number): Controls the degree of interleaving imperfection (default: 0.2)
    - `random` (function): Random function (default: Math.random)

## Technical Details

Each shuffling method in `shuffle-time` is configurable through an options object. The following options are available across the different methods:

- **`passes`**: Determines how many times the shuffling process is applied to the input array.
- **`random`**: Allows substitution of the default random number generator (`Math.random`) with a custom function.
- **`minChunk` and `maxChunk`**: Control the minimum and maximum sizes of the segments processed in methods such as `overhandShuffle`, `hinduShuffle`, and `stripShuffle`.
- **`interleaveProb` and `splitRange`**: Specific to `riffleShuffle`, these options fine-tune how the two halves are interleaved.
- **`numPiles` and `randomizePileOrder`**: Specific to `pileShuffle`, these options determine the number of piles and whether the order of piles is randomized.
- **`imperfect` and `interleaveOffset`**: Specific to `faroShuffle`, these options allow control over the precision of the interleaving.

This level of configurability enables precise control over the shuffling process, providing a level of natural randomness and variability inspired by physical card shuffling techniques.

## License

`shuffle-time` is licensed under the GPLv3. See the [LICENSE](./LICENSE) file for details.
