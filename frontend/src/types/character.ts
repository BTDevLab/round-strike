import { CharacterStats } from "./character-stats";
import { Class } from "./class";

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
  class_id: string;
  class: Class;
  characterStats: CharacterStats;
};
