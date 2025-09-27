// src/stores/decks.ts
import { create } from "zustand";
import type { DeckWithMeta } from "@/db/types";

interface DeckStore {
  decks: DeckWithMeta[];
  setDecks: (decks: DeckWithMeta[]) => void;
  addDeck: (deck: DeckWithMeta) => void;
  updateDeck: (deck: DeckWithMeta) => void;
  removeDeck: (deckId: string) => void;
}

export const useDeckStore = create<DeckStore>((set) => ({
  decks: [],
  setDecks: (decks) => set({ decks }),
  addDeck: (deck) => set((state) => ({ decks: [...state.decks, deck] })),
  updateDeck: (deck) =>
    set((state) => ({
      decks: state.decks.map((d) => (d.deckId === deck.deckId ? deck : d)),
    })),
  removeDeck: (deckId) =>
    set((state) => ({ decks: state.decks.filter((d) => d.deckId !== deckId) })),
}));
