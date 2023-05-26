import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useUserLoader } from "../layout";

export const useRouteLoader = routeLoader$(async (event) => {
  const user = await event.resolveValue(useUserLoader);
  if (
    user &&
    event.pathname
      .split("/")
      .filter((item) => item !== "")
      .slice(-1)[0] !== "signout"
  ) {
    const callBack = event.query.get("callback");
    if (callBack) {
      event.redirect(302, callBack);
      return;
    }

    event.redirect(302, "/");
  }
  return user;
});

export default component$(() => {
  //   const user = useRouteLoader();
  return (
    <div class="h-full grid items-center">
      <div class="px-5 py-10 grid gap-5 max-w-sm w-full mx-auto">
        <Slot />
      </div>
    </div>
  );
});
