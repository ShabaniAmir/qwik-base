import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useUserLoader } from "../layout";
import NavigationMenu from "~/components/admin/NavigationMenu";
import Paper from "~/components/common/Paper";

export const useRequireAuth = routeLoader$(async (event) => {
  const user = await event.resolveValue(useUserLoader);
  if (!user) event.redirect(302, "/auth/signin?callback=" + event.pathname);
});

export default component$(() => {
  useRequireAuth();
  return (
    <div class="flex lg:flex-row flex-col h-full bg-slate-100">
      <div class="p-5 shrink w-full max-w-full lg:max-w-xs">
        <div class="p-5 overflow-auto max-h-full h-full ">
          <NavigationMenu />
        </div>
      </div>
      <div class="grow p-10 text-sm ">
        <Paper class="p-10 overflow-auto max-h-full">
          <Slot />
        </Paper>
      </div>
    </div>
  );
});
