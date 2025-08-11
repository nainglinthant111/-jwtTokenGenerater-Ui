import { NextResponse } from "next/server";

const UPSTREAM_URL = "https://jwt-token-generater.vercel.app/create-key";

export async function GET() {
    try {
        const res = await fetch(UPSTREAM_URL, { cache: "no-store" });
        if (!res.ok) {
            return NextResponse.json(
                { error: "Upstream error" },
                { status: res.status }
            );
        }
        const data = await res.json().catch(() => null);
        const token =
            (data &&
                (data.secretKey || data.token || data.key || data.result)) ||
            (typeof data === "string" ? data : "");
        return NextResponse.json({ token });
    } catch {
        return NextResponse.json({ error: "Bad Gateway" }, { status: 502 });
    }
}
