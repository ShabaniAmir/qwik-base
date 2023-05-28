import { component$ } from "@builder.io/qwik";
import { Form, Link, routeLoader$ } from "@builder.io/qwik-city";
import { Button, TextField } from "~/components/form";
import useSignin from "~/lib/auth/useSignin";

export const useCallbackUrl = routeLoader$((event) => {
  const callback = event.query
    .get("callback")
    ?.split("/")
    .filter((x) => x && !x.includes("."));
  console.log({
    original: event.query.get("callback"),
    callback,
    final: "/" + callback?.join("/") || "/",
  });
  return "/" + callback?.join("/") || "/";
});

export default component$(() => {
  const signin = useSignin();
  const callbackUrl = useCallbackUrl();

  return (
    <>
      <h1 class="w-full max-w-md text-3xl font-bold text-center text-slate-800">
        Welcome
      </h1>
      <Form action={signin}>
        <div class="grid gap-10 p-5 py-10">
          <TextField
            label="Email"
            type="email"
            name="email"
            error={signin.value?.fieldErrors?.email?.join(", ")}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            error={signin.value?.fieldErrors?.password?.join(", ")}
          />
        </div>
        <div class="flex justify-center items-center">
          <Button color="primary">Login</Button>
        </div>
      </Form>
      <div class=" text-center">
        <p class="text-slate-500">Don't have an account?</p>
        <Link
          href={`/auth/signup${
            callbackUrl.value ? `?callback=${callbackUrl.value}` : ""
          }`}
          class="text-slate-600 hover:text-slate-500 hover:underline transition-all ease-in-out duration-200"
        >
          Sign up
        </Link>
      </div>
    </>
  );
});
