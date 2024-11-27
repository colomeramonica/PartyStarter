import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface Character {
  name: string;
  description: string;
  class: string;
  race: string;
  alignment: string;
  background: string;
  flaws: string;
  bonds: string;
  ideals: string;
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
}

interface CharacterState {
  character: Character;
  setCharacter: (character: Character) => void;
}

export const useCharacterState = create<CharacterState>()(
  devtools(
    persist(
      (set) => ({
        character: {
          name: '',
          description: '',
          class: '',
          race: '',
          alignment: '',
          background: '',
          flaws: '',
          bonds: '',
          ideals: '',
          str: '',
          dex: '',
          con: '',
          int: '',
          wis: '',
          cha: ''
        },
        setCharacter: (character) => set({ character }),
      }),
      { name: 'character-storage' }
    )
  )
);