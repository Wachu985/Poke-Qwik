import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';



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

    const {
        showBackImage,
        showPokemon,
        toogleFromBack,
        toogleVisible,
    } = usePokemonGame();

    return (
        <>
            {/* <span class="text-5xl">Pokemon: {location.params.id}</span> */}
            <span class="text-5xl">Pokemon: {pokemonId}</span>
            <PokemonImage id={pokemonId.value} backImage={showBackImage.value} isVisible={showPokemon.value} />
            <div class="mr-2">
                <button onClick$={toogleFromBack} class="btn btn-primary mr-2">Voltear</button>
                <button onClick$={toogleVisible} class="btn btn-primary mr-2">Revelar</button>
            </div>
        </>
    )
});