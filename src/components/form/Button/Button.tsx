import { Slot, component$ } from "@builder.io/qwik";
import { tv } from "tailwind-variants";
/**

Represents the variants for the button component.
@const buttonVariants - Object with button variants.
*/
const buttonVariants = tv({
  base: "py-3 px-5 transition-all ease-in-out text-slate-800 duration-200 rounded-md shadow-md bg-slate-300 hover:bg-slate-200 hover:shadow-lg active:shadow-sm active:bg-slate-400",
  variants: {
    color: {
      ghost:
        "text-slate-600 bg-transparent hover:bg-slate-200 active:bg-slate-300 shadow-none hover:shadow-none",
      primary: "text-white bg-slate-600 hover:bg-slate-500 active:bg-slate-700",
      warning:
        "text-white bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-700",
      danger: "text-white bg-red-600 hover:bg-red-500 active:bg-red-700",
    },
  },
});

/**

Represents a Button component.
@component$
@param {Object} props - The props for the Button component.
@param {string} [props.color] - The color variant for the button.
@returns {JSX.Element} - The rendered Button component.
*/
const Button = component$(
  (props: {
    color?: keyof typeof buttonVariants.variants.color;
    class?: string;
  }) => {
    return (
      <button
        class={
          buttonVariants({ color: props.color }) + " " + (props.class || "")
        }
      >
        <Slot />
      </button>
    );
  }
);

export default Button;
