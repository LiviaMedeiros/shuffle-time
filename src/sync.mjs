export const overhandShuffle = (
  $,
  { random = Math.random, minChunk = 1, maxChunk = 5, passes = 10 } = {}
) =>
  Array.from({ length: passes }).reduce((s) => {
    const getChunk = () =>
      Math.floor(random() * (maxChunk - minChunk + 1)) + minChunk
    let temp = []
    while (s.length) temp = [...s.splice(0, getChunk()), ...temp]
    return temp
  }, [...$])

export const riffleShuffle = (
  $,
  { random = Math.random, passes = 5, interleaveProb = 0.5, splitRange = 10 } = {}
) =>
  Array.from({ length: passes }).reduce((s) => {
    const cutPoint = Math.floor(
      s.length / 2 + (random() * splitRange - splitRange / 2)
    )
    const left = s.slice(0, cutPoint)
    const right = s.slice(cutPoint)
    return Array.from({ length: s.length }, () =>
      left.length && (random() < interleaveProb || !right.length)
        ? left.shift()
        : right.shift()
    )
  }, [...$])

export const hinduShuffle = (
  $,
  { random = Math.random, minChunk = 1, maxChunk = 5, passes = 10 } = {}
) =>
  Array.from({ length: passes }).reduce((s) => {
    let temp = []
    const getChunk = () =>
      Math.floor(random() * (maxChunk - minChunk + 1)) + minChunk
    while (s.length) {
      const chunk = s.splice(0, getChunk())
      temp.splice(Math.floor(random() * (temp.length + 1)), 0, ...chunk)
    }
    return temp
  }, [...$])

export const pileShuffle = (
  $,
  { random = Math.random, numPiles = 7, randomizePileOrder = true, passes = 1 } = {}
) =>
  Array.from({ length: passes }).reduce((s) => {
    const piles = Array.from({ length: numPiles }, () => [])
    s.forEach((c, i) => piles[i % numPiles].push(c))
    return (randomizePileOrder ? piles.sort(() => random() - 0.5) : piles).flat()
  }, [...$])

export const stripShuffle = (
  $,
  { random = Math.random, minChunk = 1, maxChunk = 5, passes = 1 } = {}
) =>
  Array.from({ length: passes }).reduce((s) => {
    const chunks = []
    while (s.length)
      chunks.push(
        s.splice(
          0,
          Math.floor(random() * (maxChunk - minChunk + 1)) + minChunk
        )
      )
    return chunks.sort(() => random() - 0.5).flat()
  }, [...$])

export const faroShuffle = (
  $,
  { random = Math.random, imperfect = true, interleaveOffset = 0.2, passes = 1 } = {}
) =>
  Array.from({ length: passes }).reduce((s) => {
    const mid = Math.ceil(s.length / 2)
    const left = s.slice(0, mid)
    const right = s.slice(mid)
    return left
      .flatMap((c, i) =>
        (imperfect && random() < interleaveOffset ? [c, right[i]] : [right[i], c]).filter(Boolean)
      )
      .filter(Boolean)
  }, [...$])
