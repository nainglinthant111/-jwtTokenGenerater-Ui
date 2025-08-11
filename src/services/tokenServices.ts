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
    console.log("start");
    const { data } = await axios.post<{ token: string }>(
        url + "/generate-token",
        payload,
        {
            headers: { "x-secret-key": secretKey },
        }
    );
    console.log("data", data);
    return data.token;
}
