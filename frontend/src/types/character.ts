import { CharacterStats } from "./character-stats";

export type Character = {
  ID: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  level: number;
  experience: number;
  hp: number;
  mp: number;
  userId: string;
  characterStats: CharacterStats;
};
