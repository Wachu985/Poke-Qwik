import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return (
        <>
            <h1>Hola Mundo - List SSR</h1>
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