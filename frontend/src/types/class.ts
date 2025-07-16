export interface Class {
  ID: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  name: string;
  description: string;
  base_strength: number;
  base_intelligence: number;
  base_dexterity: number;
  base_defense: number;
  base_max_hp: number;
  base_max_mp: number;
}
