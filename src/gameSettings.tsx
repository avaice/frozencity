export const INITIAL_SETTING = () => ({
  key: "statusState",
  default: {
    map: "Title",
    position: {
      x: 1,
      y: 2,
    },
    direction: "N",
    exp: 0,
    money: 0,
    health: 25,
    maxHealth: 25,
    magical: 0,
    level: 1,
    light: 0,
    steps: -1,
    weather: "NIGHT",
    items: ["Chocolate", "Taimatsu"],
    keys: {
      canMonsterSpawn: false,
      engine: false,
    },
    magicals: ["reiki"],
    debug: false,
    equipments: {
      sword: "ChopStick",
      shield: "WoodBoard",
    },
  },
})

export const STATIC_GAME_SETTING = {
  maxItem: 8,
} as const
