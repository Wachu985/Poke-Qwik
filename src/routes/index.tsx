import { component$, $ } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export default component$(() => {


  const nav = useNavigate();
  const {
    pokemonId,
    showBackImage,
    showPokemon,
    toogleFromBack,
    toogleVisible,
    nextPokemon,
    prevPokemon
  } = usePokemonGame();



  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${id}`)
  });


  return (
    <>

      <span class="text-2xl">Buscador Simple</span>
      <span class="text-9xl">{pokemonId}</span>
      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage id={pokemonId.value} backImage={showBackImage.value} isVisible={showPokemon.value} />
      </div>


      <div class="mr-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={toogleFromBack} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={toogleVisible} class="btn btn-primary mr-2">Revelar</button>
        <button onClick$={nextPokemon} class="btn btn-primary">Siguiente</button>
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
