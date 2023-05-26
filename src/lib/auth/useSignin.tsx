import { globalAction$, zod$ } from "@builder.io/qwik-city";
import { z } from "zod";
import prisma from "~/util/db";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { Session } from "./getSession";
export default globalAction$(async (data, event) => {

    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    })
    if (!user) {
        return event.fail(401, {
            fieldErrors: {
                email: ["Email not found"]
            }
        })
    }

    const passwordValid = await bcrypt.compare(data.password, user.password)
    if (!passwordValid) {
        return event.fail(401, {
            fieldErrors: {
                password: ["Incorrect password"]
            }
        })
    }

    const payload: Session = {
        userId: user.id,
    }

    const token = await Jwt.sign(payload,
        event.env.get("JWT_SECRET") || "adfs9asudflkjasdflkasdlfk", {
        expiresIn: "7d",
    });

    event.cookie.set("token", token, {
        httpOnly: true,
        path: "/",
    })

    return {
        success: true,
    }

}, zod$({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
}));