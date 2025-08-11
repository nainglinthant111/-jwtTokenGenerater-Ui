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
import { CheckIcon, CopyIcon, PlusIcon, TrashIcon } from "lucide-react";
import { generateKeyApi, generateToken } from "@/services/tokenServices";

type KeyValue = { key: string; value: string };

export default function JsonToken() {
    const [pairs, setPairs] = React.useState<KeyValue[]>([
        { key: "", value: "" },
    ]);
    const [secretKey, setSecretKey] = React.useState<string>("");
    const [token, setToken] = React.useState<string>("");
    const [isCopied, setIsCopied] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    function handleAddPair(): void {
        setPairs((prev) => [...prev, { key: "", value: "" }]);
    }

    function handleRemovePair(index: number): void {
        setPairs((prev) => prev.filter((_, i) => i !== index));
    }

    function handleChangePair(
        index: number,
        field: "key" | "value",
        value: string
    ): void {
        setPairs((prev) =>
            prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
        );
    }

    async function handleRefreshSecret(): Promise<void> {
        setIsLoading(true);
        setError("");
        try {
            const key = await generateKeyApi();
            setSecretKey(key ?? "");
        } catch {
            setError("Failed to refresh secret key");
        } finally {
            setIsLoading(false);
        }
    }

    function handleClear(): void {
        setPairs([{ key: "", value: "" }]);
        setSecretKey("");
        setToken("");
        setError("");
        setIsCopied(false);
    }

    async function handleSubmit(): Promise<void> {
        setIsLoading(true);
        setError("");
        setToken("");
        try {
            const payloadObject = pairs.reduce<Record<string, string>>(
                (acc, item) => {
                    if (item.key) acc[item.key] = item.value;
                    return acc;
                },
                {}
            );
            const tokenValue = await generateToken(secretKey, payloadObject);
            setToken(tokenValue ?? "");
        } catch {
            setError("Failed to generate token");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCopy(): Promise<void> {
        if (!token) return;
        try {
            await navigator.clipboard.writeText(token);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        } catch {
            setIsCopied(false);
        }
    }

    const canSubmit =
        secretKey.trim().length > 0 &&
        pairs.some((p) => p.key.trim().length > 0);

    return (
        <div className="w-full h-full">
            <Card className="border-gray-100 mt-8">
                <CardHeader>
                    <CardTitle>Create Token By Json</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {pairs.map((pair, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2"
                        >
                            <Input
                                placeholder="key"
                                className="w-1/2"
                                value={pair.key}
                                onChange={(e) =>
                                    handleChangePair(
                                        index,
                                        "key",
                                        e.target.value
                                    )
                                }
                                type="text"
                            />
                            <Input
                                placeholder="value"
                                className="w-1/2"
                                value={pair.value}
                                onChange={(e) =>
                                    handleChangePair(
                                        index,
                                        "value",
                                        e.target.value
                                    )
                                }
                                type="text"
                            />
                            {pairs.length > 1 && (
                                <Button
                                    type="button"
                                    className="cursor-pointer"
                                    variant={"outline"}
                                    onClick={() => handleRemovePair(index)}
                                    aria-label="Remove pair"
                                >
                                    <TrashIcon />
                                </Button>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            className="mt-2 cursor-pointer"
                            variant={"outline"}
                            onClick={handleAddPair}
                        >
                            <PlusIcon />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="border-gray-100 mt-8">
                <CardHeader>
                    <CardTitle>Secret Key</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Secret Key"
                            name="secretKey"
                            type="text"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                        />
                        <Button
                            type="button"
                            className="cursor-pointer"
                            variant={"outline"}
                            onClick={handleRefreshSecret}
                            disabled={isLoading}
                        >
                            Refresh
                        </Button>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            className="cursor-pointer"
                            variant={"outline"}
                            onClick={handleClear}
                            disabled={isLoading}
                        >
                            Clear
                        </Button>
                        <Button
                            type="button"
                            className="cursor-pointer"
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
                    <CardTitle>Result Token</CardTitle>
                    <CardAction>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleCopy}
                            disabled={!token}
                            aria-label="Copy token"
                        >
                            {isCopied ? <CheckIcon /> : <CopyIcon />}
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <pre className="w-full border-gray-500 border rounded-md px-2 h-10 flex items-center justify-center">
                        <code className="text-center">{token}</code>
                    </pre>
                </CardContent>
            </Card>
        </div>
    );
}
