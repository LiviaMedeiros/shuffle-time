export const overhandShuffle = async (
  $,
  { random = Math.random, minChunk = 1, maxChunk = 5, passes = 10 } = {}
) => Array.from({ length: passes }).reduce(async $ => { $ = await $
  const getChunk = () => Math.floor(random() * (maxChunk - minChunk + 1)) + minChunk
  let _ = []
  while ($.length)
    _ = [...$.splice(0, getChunk()), ..._]
  return _
}, Promise.resolve([...$]) )

export const riffleShuffle = async (
  $,
  { random = Math.random, passes = 5, interleaveProb = 0.5, splitRange = 10 } = {}
) => Array.from({ length: passes }).reduce(async $ => { $ = await $
  const cutPoint = Math.floor($.length / 2 + (random() * splitRange - splitRange / 2))
  const left = $.slice(0, cutPoint)
  const right = $.slice(cutPoint)
  return Array.from({ length: $.length }, () =>
    left.length && (random() < interleaveProb || !right.length)
      ? left.shift()
      : right.shift()
  )
}, Promise.resolve([...$]))

export const hinduShuffle = async (
  $,
  { random = Math.random, minChunk = 1, maxChunk = 5, passes = 10 } = {}
) => Array.from({ length: passes }).reduce(async $ => { $ = await $
  const getChunk = () => Math.floor(random() * (maxChunk - minChunk + 1)) + minChunk
  let _ = []
  while ($.length)
    _.splice(Math.floor(random() * (_.length + 1)), 0, ...$.splice(0, getChunk()))
  return _
}, Promise.resolve([...$]))

export const pileShuffle = async (
  $,
  { random = Math.random, numPiles = 7, randomizePileOrder = true, passes = 1 } = {}
) => Array.from({ length: passes }).reduce(async $ => { $ = await $
  const _ = Array.from({ length: numPiles }, () => [])
  $.forEach((c, i) => _[i % numPiles].push(c))
  return (randomizePileOrder ? _.sort(() => random() - 0.5) : _).flat()
}, Promise.resolve([...$]))

export const stripShuffle = async (
  $,
  { random = Math.random, minChunk = 1, maxChunk = 5, passes = 1 } = {}
) => Array.from({ length: passes }).reduce(async $ => { $ = await $
  const _ = []
  while ($.length)
    _.push($.splice(0, Math.floor(random() * (maxChunk - minChunk + 1)) + minChunk))
  return _.sort(() => random() - 0.5).flat()
}, Promise.resolve([...$]))

export const faroShuffle = async (
  $,
  { random = Math.random, imperfect = true, interleaveOffset = 0.2, passes = 1 } = {}
) => Array.from({ length: passes }).reduce(async $ => { $ = await $
  const mid = Math.ceil($.length / 2)
  const left = $.slice(0, mid)
  const right = $.slice(mid)
  return left
    .flatMap((c, i) => (imperfect && random() < interleaveOffset ? [c, right[i]] : [right[i], c]).filter(Boolean))
    .filter(Boolean)
}, Promise.resolve([...$]))
