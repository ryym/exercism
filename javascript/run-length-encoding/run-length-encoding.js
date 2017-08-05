const encode = (value) => {
  const m = value.match(/(\D)\1*/g)
  return (m || []).reduce((s, block) => {
    const chr = block[0]
    const n = block.length > 1 ? block.length : ''
    return `${s}${n}${chr}`
  }, '')
}

const decode = (value) => {
  const m = value.match(/\d*\D/g)
  return (m || []).reduce((s, block) => {
    const lastIdx = block.length - 1
    const chr = block[lastIdx]
    const n = Number(block.slice(0, lastIdx)) || 1
    for (let i = 0; i < n; i++) s += chr
    return s
  }, '')
}

module.exports = { encode, decode }
