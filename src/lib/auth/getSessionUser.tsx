import { server$ } from "@builder.io/qwik-city";
import { Session } from "./getSession";
import prisma from "~/util/db";
/**
 * Asynchronous function that handles requests to the server.
 * 
 * @param session - The session object representing the user's session.
 * @returns The safe user object if the session exists and the user is found, otherwise null.
 */
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