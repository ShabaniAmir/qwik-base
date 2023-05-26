import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import getSession from "~/lib/auth/getSession";
import getSessionUser from "~/lib/auth/getSessionUser";

export const useUserLoader = routeLoader$(async (event) => {
  const session = await getSession(event);
  const user = await getSessionUser(session);
  if (!user) return undefined;

  return user;
});

export default component$(() => {
  useUserLoader();
  return <Slot />;
});
