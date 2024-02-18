import { createContextId } from "@builder.io/qwik";



export interface PokemonGameState {
    pokemonId: number,
    showPokemon: boolean,
    showBackImage: boolean,
}



export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context')