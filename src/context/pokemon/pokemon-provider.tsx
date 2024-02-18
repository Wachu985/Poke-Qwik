/* eslint-disable qwik/no-use-visible-task */
import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { PokemonListContext, PokemonGameContext } from "~/context";
import type { PokemonListState, PokemonGameState } from "~/context";

export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 1,
        showBackImage: false,
        showPokemon: false
    });
    const pokemonListState = useStore<PokemonListState>({
        currentPage: 0,
        isLoading: false,
        completeApi: false,
        pokemons: [],
    })

    // TODO: todo el flujo para por el layout y este contexto es global
    useContextProvider(PokemonGameContext, pokemonGame)
    useContextProvider(PokemonListContext, pokemonListState)

    useVisibleTask$(() => {
        const data = localStorage.getItem('pokemon-game');
        if (data) {
            const {
                pokemonId = 1,
                showBackImage = false,
                showPokemon = false
            } = JSON.parse(data) as PokemonGameState
            pokemonGame.pokemonId = pokemonId;
            pokemonGame.showBackImage = showBackImage;
            pokemonGame.showPokemon = showPokemon;

        }
    })
    useVisibleTask$(({ track }) => {
        track(() => [pokemonGame.pokemonId, pokemonGame.showBackImage, pokemonGame.showPokemon])
        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
    })

    return <Slot />;

});
