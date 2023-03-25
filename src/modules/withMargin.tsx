export const withMargin = (num: number, margin: number): number => {
  return Math.max(
    0,
    num + Math.floor(Math.random() * (margin * 2 + 1) - margin)
  )
}
