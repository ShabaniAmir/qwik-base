import { globalAction$, zod$ } from "@builder.io/qwik-city";
import { z } from "zod";
import prisma from "~/util/db";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { Session } from "./getSession";
export default globalAction$(async (data, event) => {
    event.cookie.delete("token", {
        path: "/",
    })
    event.redirect(302, "/")
    return {
        success: true,
    }
},)