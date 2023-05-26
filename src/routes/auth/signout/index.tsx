import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  const dots = useSignal(1);
  useVisibleTask$(({ track, cleanup }) => {
    track(() => dots.value);
    const interval = setInterval(() => {
      dots.value++;
      if (dots.value > 3) dots.value = 1;
    }, 1000);
    cleanup(() => {
      clearInterval(interval);
    });
  });
  return (
    <div class="text-center">
      Signing out {Array(dots.value).fill(".").join("")}
    </div>
  );
});
