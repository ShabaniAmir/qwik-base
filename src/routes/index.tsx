import { component$ } from "@builder.io/qwik";
import { DocumentHead, Form, Link, routeLoader$ } from "@builder.io/qwik-city";
import { Button } from "~/components/form";
import useSignout from "~/lib/auth/useSignout";
import { useUserLoader } from "./layout";

export const useUser = routeLoader$(async (event) => {
  return event.resolveValue(useUserLoader);
});

export default component$(() => {
  const signout = useSignout();
  const user = useUser();

  return (
    <div>
      {user.value && (
        <Form action={signout}>
          <Button>Sign out</Button>
        </Form>
      )}
      {!user.value && (
        <Link href="/auth/signin">
          <Button>Sign in</Button>
        </Link>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
