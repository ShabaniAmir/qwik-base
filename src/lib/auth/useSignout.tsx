import { globalAction$, zod$ } from "@builder.io/qwik-city";

export default globalAction$(async (data, event) => {
    event.cookie.delete("token", {
        path: "/",
    })
    event.redirect(302, "/")
    return {
        success: true,
    }
},)