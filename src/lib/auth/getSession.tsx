import { RequestEventLoader, server$ } from "@builder.io/qwik-city";
import Jwt from "jsonwebtoken";

export interface Session {
    userId: string;
}
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