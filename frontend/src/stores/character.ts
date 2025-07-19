import type { Character } from "@/types/character";
import { create } from "zustand";

type CharacterState = {
  characters: Character[] | [];
};

type CharacterActions = {
  setCharacters: (characters: Character[] | []) => void;
};

const initialState: CharacterState = {
  characters: [],
};

export const useCharacterStore = create<{
  state: CharacterState;
  actions: CharacterActions;
}>((set) => ({
  state: { ...initialState },
  actions: {
    setCharacters: (characters) =>
      set((store) => ({ state: { ...store.state, characters } })),
  },
}));
