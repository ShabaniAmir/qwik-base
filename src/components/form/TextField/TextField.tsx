import { component$, useSignal } from "@builder.io/qwik";

interface TextFieldProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  label?: string;
  name?: string;
  error?: string;
}
export default component$((props: TextFieldProps) => {
  const isActive = useSignal(false);
  const inputRef = useSignal<HTMLInputElement>();

  return (
    <div class="flex flex-col ">
      {props.label && (
        <label
          class={` absolute px-5 py-3 text-slate-500 transition-all ease-in-out pointer-events-none ${
            isActive.value ? "-translate-y-full text-xs" : "translate-y-0"
          }`}
        >
          <span class=" p-1 px-2">{props.label}</span>
        </label>
      )}
      <input
        type={props.type || "text"}
        class={`${
          props.error ? "ring-1 ring-red-500" : ""
        } border rounded-md transition-all ring-0 outline-none ease-in-out px-5 py-3 focus:shadow-lg focus:ring-2 focus:ring-slate-500`}
        ref={inputRef}
        name={props.name}
        onFocus$={() => {
          isActive.value = true;
        }}
        onBlur$={(e) => {
          if (e.target.value === "") {
            isActive.value = false;
          }
        }}
      />
      {props.error && (
        <div class="text-red-500 text-xs px-5 py-3 capitalize">
          {props.error}
        </div>
      )}
    </div>
  );
});
