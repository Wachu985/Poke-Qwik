import { component$, $, useContext } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  // const pokemonId = useSignal<number>(1); //primitivos , booleans, strings, numbers
  // const showBackImage = useSignal<boolean>(false)
  // const showPokemon = useSignal<boolean>(true);

  const pokemonGameState = useContext(PokemonGameContext);

  const nav = useNavigate();

  const changePokemonId = $((value: number) => {
    if ((pokemonGameState.pokemonId + value) <= 0) return;
    pokemonGameState.pokemonId += value;
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGameState.pokemonId}`)
  });


  return (
    <>

      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{pokemonGameState.pokemonId}</span>
      <div onClick$={() => goToPokemon()}>
        <PokemonImage id={pokemonGameState.pokemonId} backImage={pokemonGameState.showBackImage} isVisible={pokemonGameState.showPokemon} />
      </div>


      <div class="mr-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => pokemonGameState.showBackImage = !pokemonGameState.showBackImage} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => pokemonGameState.showPokemon = !pokemonGameState.showPokemon} class="btn btn-primary mr-2">Revelar</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary">Siguiente</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera aplicacion en Qwik",
    },
  ],
};
