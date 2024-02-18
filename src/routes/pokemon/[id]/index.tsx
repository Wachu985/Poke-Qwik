import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';



export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
    const id = Number(params.id)
    if (isNaN(id)) throw redirect(301, '/');
    if (id <= 0) throw redirect(301, '/');
    if (id > 1025) throw redirect(301, '/');
    return id;
});


export default component$(() => {

    // const location = useLocation();

    const pokemonId = usePokemonId();

    const pokemonGameState = useContext(PokemonGameContext);

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {location.params.id}</span> */}
            <span class="text-5xl">Pokemon: {pokemonId}</span>
            <PokemonImage id={pokemonId.value} backImage={pokemonGameState.showBackImage} isVisible={pokemonGameState.showPokemon} />
            <div class="mr-2">
                <button onClick$={() => pokemonGameState.showBackImage = !pokemonGameState.showBackImage} class="btn btn-primary mr-2">Voltear</button>
                <button onClick$={() => pokemonGameState.showPokemon = !pokemonGameState.showPokemon} class="btn btn-primary mr-2">Revelar</button>
            </div>
        </>
    )
});