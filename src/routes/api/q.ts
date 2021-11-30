import type { qResponse } from "$lib/api";
import { API_URL } from "$lib/env";
import type { Locals } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";
import type { JSONValue } from "@sveltejs/kit/types/helper";

export const post: RequestHandler<Locals, JSONValue> = async (request) => {
    try {
        const res = await fetch(`${API_URL}/api/q`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request.body),
        });
        const r: qResponse = await res.json();
        if (r.error) { throw new Error(r.error) };
        return {
            status: 200,
            body: JSON.stringify(r),
        }
    } catch (err) {
        return {
            status: 500,
            body: (err as Error).message,
        }
    }
}