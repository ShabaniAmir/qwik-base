import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";
import { Button, TextField } from "~/components/form";
import useSignup from "~/lib/auth/useSignup";

export default component$(() => {
  const signup = useSignup();
  return (
    <>
      <h1 class="w-full max-w-md text-3xl font-bold text-center text-slate-800">
        Enjoy your stay,
      </h1>
      <Form action={signup}>
        <div class="grid gap-10 p-5 py-10">
          <TextField
            label="Email"
            type="email"
            name="email"
            error={signup.value?.fieldErrors?.email?.join(", ")}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            error={signup.value?.fieldErrors?.password?.join(", ")}
          />
        </div>
        <div class="flex justify-center items-center">
          <Button color="primary">Create Account</Button>
        </div>
      </Form>
      <div class=" text-center">
        <p class="text-slate-500">Already have an account?</p>
        <Link
          href="/auth/signin"
          class="text-slate-600 hover:text-slate-500 hover:underline transition-all ease-in-out duration-200"
        >
          Sign in
        </Link>
      </div>
    </>
  );
});
