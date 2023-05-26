import { server$ } from "@builder.io/qwik-city";
import { Session } from "./getSession";
import prisma from "~/util/db";

export default server$(async (session: Session | null | undefined) => {
    if (!session) return null;

    const user = await prisma.user.findUnique({
        where: {
            id: session.userId,
        },
    })
    if (!user) return null;

    const {password, ...safeUser} = user;
    
    return safeUser;
});