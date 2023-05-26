import { component$, useSignal } from "@builder.io/qwik";

/**
 *
 * Represents the props for the TextField component.
 */
interface TextFieldProps {
  /*
   * The type of the input field.
   * Can be one of "text", "email", "password", "number", "tel", or "url". */
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  /*
   * The label for the input field.
   */
  label?: string;
  /*
   * The name of the input field.
   */
  name?: string;
  /*
   * The error message to display for the input field.
   */
  error?: string;
}
/**

A custom TextField component.
Renders an input field with an optional label and error message.
@param props - The TextFieldProps object containing the component's props.
@returns The rendered TextField component.
*/
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
