import { RequestEventLoader, server$ } from "@builder.io/qwik-city";
import Jwt from "jsonwebtoken";

/**
 * Represents a session with a user ID.
 */
export interface Session {
    userId: string;
}
/**
 * Retrieves the decrypted session information from a token.
 *
 * @param event - The request event loader containing the token and environment information.
 * @returns The decrypted session object if successful, otherwise null.
 */
export default server$(async (event: RequestEventLoader) => {
    const token = event.cookie.get("token");
    if (!token) return null;

    try {
        const decrypted = await Jwt.verify(token.value, event.env.get("JWT_SECRET") || "adfs9asudflkjasdflkasdlfk") as {
            userId: string;
        };
        return decrypted
    } catch (e) {
        event.cookie.set("token", "", {
            expires: new Date(0),
        });
        return null;
    }
})