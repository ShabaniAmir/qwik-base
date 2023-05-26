import { globalAction$, zod$ } from "@builder.io/qwik-city";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "~/util/db";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { Session } from "./getSession";
export default globalAction$(async (data, event) => {
    const email = data.email;
    const password = await bcrypt.hash(data.password, 10);
    try {
        const newUser =  await prisma.user.create({
            data: {
                email,
                password,
            }
        })
        if (!newUser) {
            throw new Error("Something went wrong")
        }

        const payload: Session = {
            userId: newUser.id,
        }

        const token = await Jwt.sign(payload, event.env.get("JWT_SECRET") || "adfs9asudflkjasdflkasdlfk" , {
            expiresIn: "7d",
        }
        )

        event.cookie.set("token", token, {
            httpOnly: true,
            path: "/",
        })

        return {
            success: true,
        }
    }catch (e: any) {
        console.error(e)

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log("Email already exists")
                return event.fail(409, {
                    fieldErrors: {
                        email: ["Email already exists"]
                    }
                })
            }
        }

        if (e instanceof Prisma.PrismaClientValidationError) {
            event.fail(400, {
                message: "Invalid input",
            })
        }

        event.fail(500, {
            message: "Something went wrong",
        })
    }
}, zod$({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
}));