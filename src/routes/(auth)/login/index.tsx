import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';


export const useLoginUserAction = routeAction$((data, { cookie, redirect }) => {
    const { email, password } = data;
    if (email === 'pedro@google.com' && password === '123456') {
        cookie.set('jwt', 'este_es_mi_jwt', { secure: true, path: '/' })
        throw redirect(302, '/')
    }
    return {
        success: false
    }
}, zod$({
    email: z.string().email('Formato no valido'),
    password: z.string().min(6, 'Minimo de 6 letras')
}))

export default component$(() => {

    useStylesScoped$(styles);

    const action = useLoginUserAction();

    return (
        <Form action={action} class="login-form mt-5">
            <div class="relative">
                <input
                    name="email" type="text" placeholder="Email address"
                />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input
                    name="password" type="password" placeholder="Password"
                />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button type='submit'>Ingresar</button>
            </div>

            <code>
                {JSON.stringify(action.value, undefined, 2)}
            </code>
        </Form>
    )
});