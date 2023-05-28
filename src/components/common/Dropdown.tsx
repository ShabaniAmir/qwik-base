import { Slot, component$, useSignal } from "@builder.io/qwik";

export default component$((props: { open?: boolean }) => {
  const isOpen = useSignal(props.open || false);
  return (
    <div>
      <button
        class="w-full"
        onClick$={() => {
          isOpen.value = !isOpen.value;
        }}
      >
        <Slot name="label" />
      </button>
      <div
        class={`relative overflow-hidden transition-all ease-in-out duration-300 ${
          isOpen.value ? "max-h-96" : "max-h-0"
        }`}
      >
        <Slot />
      </div>
    </div>
  );
});
