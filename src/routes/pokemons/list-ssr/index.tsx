import { $, component$, useComputed$, useSignal, useStore, useTask$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal, TextLoader } from '~/components/shared';
import { getFunFactAboutPokemon } from '~/helpers/get-gemini-ia-response';
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
    const modalVisible = useSignal<boolean>(false);


    const modalPokemon = useStore({
        id: 0,
        name: '',
        geminiResponse: ''
    });

    const currentOffset = useComputed$<number>(() => {
        // const offsetString = url.searchParams.get('offset');
        // return Number(offsetString || '0');
        const offsetString = new URLSearchParams(location.url.search)
        const offset = Number(offsetString.get('offset') || '0')
        if (offset < 0) return 0
        return offset
    });

    // TODO: Modal Functions
    const showModal = $((id: number, name: string) => {
        modalPokemon.id = id;
        modalPokemon.name = name;
        modalVisible.value = true
    })
    const closeModal = $(() => {
        modalVisible.value = false
    })

    useTask$(({ track }) => {
        track(() => modalPokemon.name)
        modalPokemon.geminiResponse = ''
        if (modalPokemon.name.length > 0) {
            getFunFactAboutPokemon(modalPokemon.name).then(resp => modalPokemon.geminiResponse = resp)
        }
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
                        <div onClick$={() => showModal(pokemon.id, pokemon.name)} key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
                            <PokemonImage id={pokemon.id} />
                            <span class="capitalize">{pokemon.name}</span>
                        </div>
                    )
                    )
                }
            </div>

            <Modal showModal={modalVisible.value} closeCallback={closeModal} >
                <div q:slot='title'>{modalPokemon.name}</div>
                <div q:slot='content' class='flex flex-col justify-center items-center'>
                    <PokemonImage id={modalPokemon.id} />

                    <span>{
                        modalPokemon.geminiResponse === '' ?
                            <TextLoader /> :
                            modalPokemon.geminiResponse
                    }</span>
                </div>
            </Modal>
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