export const calcPower = (lv: number) => {
  return lv
}
export const calcMaxHealth = (lv: number) => {
  return Math.floor(Math.pow(25, (10 + lv) / 10.5))
}
export const calcRequireExp = (lv: number) => {
  return Math.floor(20 * Math.pow(1.7, lv))
}
export const calcRequireMoney = (lv: number) => {
  return lv * 20
}
