import { Stat } from "./Stat";
import { Team } from "./Team";

export interface Game {
  id?: number;
  blueTeam: Team;
  redTeam: Team;
  gameTime: Date;
  redScore: number;
  blueScore: number;
  stats: Stat[];
}
