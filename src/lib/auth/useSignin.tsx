import { globalAction$, zod$ } from "@builder.io/qwik-city";
import { z } from "zod";
import prisma from "~/util/db";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { Session } from "./getSession";

/**
 * Authenticates a user and generates a JWT token for session management.
 *
 * @param data - The data object containing user credentials.
 * @param event - The event object representing the current request.
 * @returns A Promise resolving to an object indicating the authentication result.
 *          - If authentication is successful, the object will have a `success` property set to `true`.
 *          - If authentication fails, the object will contain error details.
 */
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