import axios from "axios";

type GenerateKeyProxyResponse = { token: string };

export async function generateKeyApi(): Promise<string> {
    const { data } = await axios.get<GenerateKeyProxyResponse>(
        "/api/generate-key"
    );
    return data.token;
}
