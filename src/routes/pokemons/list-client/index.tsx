import { $, component$, useContext, useOnDocument, useTask$, } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';

// interface PokemonState {
//     currentPage: number;
//     isLoading: boolean,
//     completeApi: boolean,
//     pokemons: SmallPokemon[]
// }


export default component$(() => {

    // const pokemonState = useStore<PokemonState>({
    //     currentPage: 0,
    //     isLoading: false,
    //     completeApi: false,
    //     pokemons: []
    // })

    const pokemonState = useContext(PokemonListContext)
    const nav = useNavigate();


    // Solo lo ve el Cliente
    // useVisibleTask$(async ({ track }) => {
    //     track(() => pokemonState.currentPage)
    //     const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    //     pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    // })

    // Trae las peticiones desde el servidor 
    // TODO: NO USAR RETURN
    useTask$(async ({ track }) => {
        track(() => pokemonState.currentPage)
        const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
        if (pokemons.length === 0) pokemonState.completeApi = true;
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
        pokemonState.isLoading = false;
    })


    useOnDocument('scroll', $(() => {
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;
        if ((currentScroll + 200) >= maxScroll && !pokemonState.isLoading && !pokemonState.completeApi) {
            pokemonState.isLoading = true;
            pokemonState.currentPage++
        }
    }))

    const goPokemon = $((id: number) => {
        nav(`/pokemon/${id}`)
    })
    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Pagina Actual: {pokemonState.currentPage}</span>
                <span>Esta cargando: {pokemonState.isLoading ? "Verdadero" : "Falso"}</span>
            </div>

            <div class="mt-10">
                {/* <button onClick$={() => { pokemonState.currentPage-- }} class="btn btn-primary mr-2">Anteriores</button> */}
                <button onClick$={() => { pokemonState.currentPage++ }} class="btn btn-primary mr-2">Siguientes</button>
            </div >
            <div class="grid sm:grid-cols-6 md:grid-cols-5 xl:grid-cols-6  mt-5">
                {
                    pokemonState.pokemons.map(pokemon =>
                    (
                        <div onClick$={() => goPokemon(pokemon.id)} key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
                            <PokemonImage id={pokemon.id} />
                            <span class="capitalize">{pokemon.name}</span>
                        </div>
                    )
                    )
                }
            </div>
        </>
    )
});

export const head: DocumentHead = {
    title: `List Client`,
    meta: [
        {
            name: 'description',
            content: ' Lista desde el Client'
        }
    ]
};