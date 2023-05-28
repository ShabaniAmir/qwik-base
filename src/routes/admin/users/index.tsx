import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import AutoTable from "~/components/common/Table";
import { Button } from "~/components/form";
import prisma from "~/util/db";

export const useUsersLoader = routeLoader$(async (event) => {
  return prisma.user.findMany();
});

export default component$(() => {
  const users = useUsersLoader();
  return (
    <div class="flex flex-col gap-10">
      <div class="flex justify-between items-center">
        <h1 class="font-bold text-lg text-slate-800">Users</h1>
        <Button color="ghost">Add User</Button>
      </div>
      <div>
        <AutoTable
          columns={["email"]}
          data={users.value}
          actions={[
            ({ row }) => (
              <Link href={`/admin/users/edit/${row.id}`}>
                <Button color="ghost">Edit</Button>
              </Link>
            ),
            ({ row }) => (
              <Link href={`/admin/users/delete/${row.id}`}>
                <Button color="ghost" class="text-red-400">
                  Delete
                </Button>
              </Link>
            ),
          ]}
        />
      </div>
    </div>
  );
});
