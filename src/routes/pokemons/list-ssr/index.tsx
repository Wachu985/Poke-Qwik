import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, pathname, redirect }) => {
    const offset = Number(query.get('offset') || "0")
    if (isNaN(offset)) throw redirect(301, pathname)
    if (offset < 0) throw redirect(301, pathname)
    try {
        return await getSmallPokemons(offset)
    } catch {
        throw redirect(301, '/')
    }

});

export default component$(() => {
    const pokemonResponse = usePokemonList();
    const location = useLocation();


    const currentOffset = useComputed$<number>(() => {
        // const offsetString = url.searchParams.get('offset');
        // return Number(offsetString || '0');
        const offsetString = new URLSearchParams(location.url.search)
        const offset = Number(offsetString.get('offset') || '0')
        if (offset < 0) return 0
        return offset
    });


    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Pagina Actual: {currentOffset}</span>
                <span>Esta cargando pagina: {location.isNavigating ? "Si" : "No"}</span>
            </div>

            <div class="mt-10">
                <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">Anteriores</Link>
                <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">Siguientes</Link>
            </div >
            <div class="grid grid-cols-6 mt-5">
                {
                    pokemonResponse.value.map(pokemon =>
                    (
                        <div key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
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
    title: `List SSR`,
    meta: [
        {
            name: 'description',
            content: ' Lista desde el Servidor'
        }
    ]
};