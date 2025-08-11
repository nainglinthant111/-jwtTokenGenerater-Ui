import axios from "axios";

const url = "https://jwt-token-generater.vercel.app";
export async function generateKeyApi(): Promise<string> {
    const { data } = await axios.get(url + "/create-key");
    return data.secretKey;
}

export async function generateToken(
    secretKey: string,
    payload: unknown
): Promise<string> {
    const { data } = await axios.post<{ token: string }>(
        url + "/generate-token",
        payload,
        {
            headers: { "x-secret-key": secretKey },
        }
    );
    return data.token;
}
export async function convertJson(
    secretKey: string,
    token: string
): Promise<unknown> {
    const { data } = await axios.get(url + "/get-json", {
        params: { token }, // <-- query param
        headers: { "x-secret-key": secretKey },
    });
    return data.data;
}
