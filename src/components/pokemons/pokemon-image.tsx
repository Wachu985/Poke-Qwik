/* eslint-disable qwik/no-use-visible-task */
import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
import { Loader } from "../shared/loader/loader";

interface Props {
    id: number;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean;
}


export const PokemonImage = component$(({ id, size = 200, backImage = false, isVisible = false }: Props) => {

    const imageLoaded = useSignal<boolean>(false);
    useTask$(({ track }) => {
        track(() => id);
        imageLoaded.value = false;
    })

    const imageUrl = useComputed$(() => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${backImage ? "/back" : ""}/${id}.png`
    })


    return (
        <div class="flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
            {!imageLoaded.value && (<Loader></Loader>)}
            <img width="96" height="96"
                src={imageUrl.value}
                alt="Pokemon Sprite"
                style={{ width: `${size}px` }}
                onLoad$={() => {
                    imageLoaded.value = true;
                    console.log("Cargo")
                }}
                class={{
                    "hidden": !imageLoaded.value,
                    'brightness-0': isVisible,
                    'transition-all': true
                }}
            />
        </div>
    )
})