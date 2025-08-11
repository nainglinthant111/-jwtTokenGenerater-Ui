"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { convertJson } from "@/services/tokenServices";

export default function TokenToJson() {
    const [token, setToken] = React.useState<string>("");
    const [secretKey, setSecretKey] = React.useState<string>("");
    const [result, setResult] = React.useState<string>("");
    const [isCopied, setIsCopied] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    async function handleSubmit(): Promise<void> {
        setIsLoading(true);
        setError("");
        setResult("");
        try {
            const json = await convertJson(secretKey, token);
            setResult(JSON.stringify(json, null, 2));
        } catch {
            setError("Failed to convert token to JSON");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCopy(): Promise<void> {
        if (!result) return;
        try {
            await navigator.clipboard.writeText(result);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        } catch {
            setIsCopied(false);
        }
    }

    function handleClear(): void {
        setToken("");
        setSecretKey("");
        setResult("");
        setError("");
        setIsCopied(false);
    }

    const canSubmit = token.trim().length > 0 && secretKey.trim().length > 0;

    return (
        <div className="w-full h-full">
            <Card className="border-gray-100 mt-8">
                <CardHeader>
                    <CardTitle>Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="JWT Token"
                        name="token"
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <Input
                        placeholder="Secret Key"
                        name="secretKey"
                        type="text"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            variant={"outline"}
                            onClick={handleClear}
                            disabled={isLoading}
                        >
                            Clear
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={handleSubmit}
                            disabled={!canSubmit || isLoading}
                        >
                            {isLoading ? "Submitting" : "Submit"}
                        </Button>
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                </CardContent>
            </Card>

            <Card className="border-gray-100 mt-8">
                <CardHeader>
                    <CardTitle>Result JSON</CardTitle>
                    <CardAction>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleCopy}
                            disabled={!result}
                            aria-label="Copy JSON"
                        >
                            {isCopied ? <CheckIcon /> : <CopyIcon />}
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <pre className="w-full border-gray-500 border rounded-md px-2 min-h-24 py-2">
                        <code>{result}</code>
                    </pre>
                </CardContent>
            </Card>
        </div>
    );
}
