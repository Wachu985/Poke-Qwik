import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";


export const usePokemonGame = () => {

    const pokemonGameState = useContext(PokemonGameContext);

    const changePokemonId = $((value: number) => {
        if ((pokemonGameState.pokemonId + value) <= 0) return;
        pokemonGameState.pokemonId += value;
    })

    const toogleFromBack = $(() => {
        pokemonGameState.showBackImage = !pokemonGameState.showBackImage;
    })
    const toogleVisible = $(() => {
        pokemonGameState.showPokemon = !pokemonGameState.showPokemon;
    })

    return {
        pokemonId: useComputed$(() => pokemonGameState.pokemonId),
        showBackImage: useComputed$(() => pokemonGameState.showBackImage),
        showPokemon: useComputed$(() => pokemonGameState.showPokemon),

        nextPokemon: $(() => changePokemonId(+1)),
        prevPokemon: $(() => changePokemonId(-1)),

        toogleFromBack: toogleFromBack,
        toogleVisible: toogleVisible
    }
}