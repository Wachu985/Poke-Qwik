import { component$, useSignal, $ } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal<number>(1); //primitivos , booleans, strings, numbers
  const showBackImage = useSignal<boolean>(false)
  const showPokemon = useSignal<boolean>(true);
  const nav = useNavigate();

  const changePokemonId = $((value: number) => {
    if ((pokemonId.value + value) <= 0) return;
    pokemonId.value += value;
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}`)
  });


  return (
    <>

      <span class="text-2xl">Buscador Simple</span>

      <span class="text-9xl">{pokemonId.value}</span>
      <div onClick$={() => goToPokemon()}>
        <PokemonImage id={pokemonId.value} backImage={showBackImage.value} isVisible={showPokemon.value} />
      </div>


      <div class="mr-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => showBackImage.value = !showBackImage.value} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => showPokemon.value = !showPokemon.value} class="btn btn-primary mr-2">Revelar</button>
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
