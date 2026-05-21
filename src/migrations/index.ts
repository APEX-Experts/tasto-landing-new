import * as migration_20260429_110658 from "./20260429_110658";
import * as migration_20260429_122414 from "./20260429_122414";
import * as migration_20260429_140041 from "./20260429_140041";
import * as migration_20260429_141840 from "./20260429_141840";
import * as migration_20260429_143426 from "./20260429_143426";
import * as migration_20260429_143945 from "./20260429_143945";

export const migrations = [
  {
    up: migration_20260429_110658.up,
    down: migration_20260429_110658.down,
    name: "20260429_110658",
  },
  {
    up: migration_20260429_122414.up,
    down: migration_20260429_122414.down,
    name: "20260429_122414",
  },
  {
    up: migration_20260429_140041.up,
    down: migration_20260429_140041.down,
    name: "20260429_140041",
  },
  {
    up: migration_20260429_141840.up,
    down: migration_20260429_141840.down,
    name: "20260429_141840",
  },
  {
    up: migration_20260429_143426.up,
    down: migration_20260429_143426.down,
    name: "20260429_143426",
  },
  {
    up: migration_20260429_143945.up,
    down: migration_20260429_143945.down,
    name: "20260429_143945",
  },
];
