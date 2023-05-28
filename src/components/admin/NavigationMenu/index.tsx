import { component$ } from "@builder.io/qwik";
import { Form, Link, useLocation } from "@builder.io/qwik-city";
import Dropdown from "~/components/common/Dropdown";
import { HiChevronDownSolid } from "@qwikest/icons/heroicons";
import { Button } from "~/components/form";
import useSignout from "~/lib/auth/useSignout";
interface NavigationMenuItem {
  label: string;
  href?: string;
  items?: {
    label: string;
    href: string;
  }[];
}

const MENU_ITEMS: NavigationMenuItem[] = [
  { label: "Dashboard", href: "/admin/" },
  {
    label: "Users",
    items: [
      {
        label: "Add User",
        href: "/admin/users/add",
      },
      { label: "All Users", href: "/admin/users" },

      {
        label: "Customers",
        href: "/admin/users/customers",
      },
      {
        label: "Staff",
        href: "/admin/users/staff",
      },
    ],
  },
];

export default component$(() => {
  const location = useLocation();
  const signout = useSignout();
  return (
    <nav class="flex flex-col gap-5 h-full">
      <div class="shrink p-5">
        <Link href="/">
          <h1 class="text-2xl text-center">Signature Cuts</h1>
        </Link>
      </div>
      <div class="grow text-sm">
        <ul>
          {MENU_ITEMS.map((item, i) => (
            <li
              class="max-w-sm mx-auto px-10 rounded-md overflow-hidden"
              key={i + item.label}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  class={` ${
                    location.url.pathname === item.href
                      ? "text-slate-400"
                      : "text-slate-700"
                  }`}
                >
                  <div class="hover:text-slate-400 py-3">{item.label}</div>
                </Link>
              ) : (
                <Dropdown
                  open={item.items?.some(
                    (item) => location.url.pathname === item.href + "/"
                  )}
                >
                  <div
                    class={` ${
                      item.items?.some(
                        (item) => location.url.pathname === item.href + "/"
                      )
                        ? "text-slate-700"
                        : "text-slate-700"
                    }`}
                    q:slot="label"
                  >
                    <div class=" flex py-3 hover:text-slate-400 rouned-md w-full h-full">
                      <div class="grow text-left">{item.label}</div>
                      <HiChevronDownSolid />
                    </div>
                  </div>
                  <div class="border-l  pl-5">
                    {item.items?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        class={` ${
                          location.url.pathname === item.href + "/"
                            ? "text-slate-400"
                            : "text-slate-700"
                        }`}
                      >
                        <div class="rounded-md hover:text-slate-400 py-3">
                          {item.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </Dropdown>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div class="shrink">
        <Form action={signout}>
          <Button color="ghost" class="w-full">
            Sign Out
          </Button>
        </Form>
      </div>
    </nav>
  );
});
