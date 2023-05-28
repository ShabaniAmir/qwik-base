import { Slot, component$ } from "@builder.io/qwik";

export default component$((props: { class?: string }) => {
  return (
    <div class={"bg-white rounded-md shadow-md " + props.class}>
      <Slot />
    </div>
  );
});
