import { globalAction$, zod$ } from "@builder.io/qwik-city";

/**
 * A global action that performs a series of tasks upon invocation.
 *
 * @param data - The data passed to the action.
 * @param event - The event object representing the current event context.
 * @returns An object with the success status of the action.
 */
export default globalAction$(async (data, event) => {
    event.cookie.delete("token", {
        path: "/",
    })
    event.redirect(302, "/")
    return {
        success: true,
    }
},)