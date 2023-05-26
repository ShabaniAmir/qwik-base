import { component$ } from "@builder.io/qwik";
import { TextField } from "../form";
/**

Renders a login form component.
@component
@returns {JSX.Element} - The rendered login form component.
*/
export default component$(() => {
  return (
    <div class="grid gap-10 p-5">
      <TextField label="Email" type="email" name="email" />
      <TextField label="Password" type="password" name="password" />
    </div>
  );
});
