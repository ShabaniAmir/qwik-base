import { Slot, component$ } from "@builder.io/qwik";
import { JSX } from "@builder.io/qwik/jsx-runtime";

export const Td = component$((props: { class?: string }) => {
  return (
    <td class={"px-5 " + props.class}>
      <Slot />
    </td>
  );
});

export const TBody = component$(() => {
  return (
    <tbody class="">
      <Slot />
    </tbody>
  );
});

export const Tr = component$(() => {
  return (
    <tr>
      <Slot />
    </tr>
  );
});

export const THead = component$(() => {
  return (
    <thead class="border-b capitalize font-semibold sticky">
      <Slot />
    </thead>
  );
});

export const Table = component$(() => {
  return (
    <table class="w-full h-12 text-slate-800">
      <Slot />
    </table>
  );
});

export interface TableProps<T extends object> {
  columns: (keyof T | string)[];
  data: T[];
  actions?: ((props: { row: T }) => JSX.Element)[];
}
export default function AutoTable<T extends object>(props: TableProps<T>) {
  return (
    <div class="border rounded-xl">
      <Table>
        <THead>
          <Tr>
            {props.columns.map((column) => (
              <Td
                key={column.toString() + "col"}
                class="py-4 text-center border-r"
              >
                {column.toString()}
              </Td>
            ))}
            {props.actions?.length && <Td></Td>}
          </Tr>
        </THead>
        <TBody>
          {props.data.map((row) => (
            <Tr key={Object.values(row)[0].toString() + "row"}>
              {props.columns.map((column) => (
                <Td key={column.toString() + "col"} class="">
                  {`${row[column as keyof typeof row]}`}
                </Td>
              ))}
              {props.actions?.length && (
                <Td>{props.actions.map((action) => action({ row: row }))}</Td>
              )}
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
