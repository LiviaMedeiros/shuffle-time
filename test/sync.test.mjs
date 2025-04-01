import { test } from 'node:test'
import assert from 'node:assert'
import {
  overhandShuffle,
  riffleShuffle,
  hinduShuffle,
  pileShuffle,
  stripShuffle,
  faroShuffle
} from '../src/sync.mjs'

const deck = Array.from({ length: 52 }, (_, i) => i + 1)

const isDeckShuffled = (orig, shuffled) =>
  !orig.every((card, i) => card === shuffled[i])

const hasSameSetOfValues = (orig, shuffled) => {
  const setA = new Set(orig)
  const setB = new Set(shuffled)
  return setA.size === setB.size && [...setA].every(card => setB.has(card))
}

const optionsSets = [
  { passes: 1 },
  { passes: 5 },
  { passes: 10, minChunk: 1, maxChunk: 3 },
  { passes: 3, numPiles: 5, randomizePileOrder: true },
  { passes: 2, interleaveProb: 0.7, splitRange: 5 },
  { passes: 2, minChunk: 2, maxChunk: 8 },
  { passes: 2, minChunk: 1, maxChunk: 2 },
  { passes: 4, interleaveProb: 0.8, splitRange: 20 }
]

test('Sync Shuffle Functions with Different Options', async t => {
  for (const shuffleFunc of [
    overhandShuffle,
    riffleShuffle,
    hinduShuffle,
    pileShuffle,
    stripShuffle,
    faroShuffle
  ]) {
    for (const options of optionsSets) {
      const shuffled = shuffleFunc([...deck], options)
      assert.strictEqual(
        shuffled.length,
        deck.length,
        `${shuffleFunc.name} with ${JSON.stringify(options)}: length mismatch`
      )
      assert.ok(
        isDeckShuffled(deck, shuffled),
        `${shuffleFunc.name} with ${JSON.stringify(options)}: deck not shuffled`
      )
      assert.ok(
        hasSameSetOfValues(deck, shuffled),
        `${shuffleFunc.name} with ${JSON.stringify(options)}: value set mismatch`
      )
      const uniqueShuffles = new Set(
        Array.from({ length: 99 }, () =>
          shuffleFunc([...deck], options).join(',')
        )
      )
      assert.ok(
        uniqueShuffles.size > 1,
        `${shuffleFunc.name} with ${JSON.stringify(options)}: not random enough`
      )
    }
  }
})
