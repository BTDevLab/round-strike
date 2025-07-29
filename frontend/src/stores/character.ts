import type { Character } from "@/types/character";
import { create } from "zustand";

type CharacterState = {
  characters: Character[] | [];
  selectedCharacter: Character | null;
};

type CharacterActions = {
  setCharacters: (characters: Character[] | []) => void;
  setSelectedCharacter: (character: Character | null) => void;
};

const initialState: CharacterState = {
  characters: [],
  selectedCharacter: null,
};

export const useCharacterStore = create<{
  state: CharacterState;
  actions: CharacterActions;
}>((set) => ({
  state: { ...initialState },
  actions: {
    setCharacters: (characters) =>
      set((store) => ({ state: { ...store.state, characters } })),
    setSelectedCharacter: (character) =>
      set((store) => ({
        state: { ...store.state, selectedCharacter: character },
      })),
  },
}));
