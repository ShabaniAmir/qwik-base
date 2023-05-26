import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useUserLoader } from "../layout";

export const useRequireAuth = routeLoader$(async (event) => {
  const user = await event.resolveValue(useUserLoader);
  if (!user) event.redirect(302, "/auth/signin?callback=" + event.pathname);
});

export default component$(() => {
  useRequireAuth();
  return <Slot />;
});
