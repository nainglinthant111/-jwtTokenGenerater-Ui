"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckIcon, CopyIcon } from "lucide-react";
import { generateKeyApi } from "@/services/tokenServices";

export default function Page() {
    const [token, setToken] = React.useState<string>("");
    const [isCopied, setIsCopied] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    async function handleGenerate(): Promise<void> {
        setIsLoading(true);
        setError("");
        setIsCopied(false);
        try {
            const tokenValue = await generateKeyApi();
            setToken(tokenValue ?? "");
        } catch {
            setError("Failed to generate token");
        } finally {
            setIsLoading(false);
        }
    }

    function handleRefresh(): void {
        setToken("");
        setIsCopied(false);
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

    return (
        <div className="w-full flex flex-col justify-center overflow-y-scroll h-full">
            <div className="w-full h-full p-2 md:p-8 mx-auto lg:w-[780px]">
                <h1 className="text-2xl underline">Random Token Generator</h1>
                <p className="text-sm text-gray-500 text-justify mt-4">
                    Generate random string with the chars you want, uppercase or
                    lowercase letters, numbers and/or symbols.
                </p>
                <p className="text-sm text-gray-500">Length : 32 </p>
                <Card className="border-gray-100 mt-8">
                    <CardHeader>
                        <CardTitle>Create Key or Token</CardTitle>
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
                            <code className="text-center">
                                {isLoading ? "Generating..." : token}
                            </code>
                        </pre>
                        {error && (
                            <p className="text-red-600 text-sm mt-2">{error}</p>
                        )}
                    </CardContent>
                    <div className="flex justify-end mt-4 space-x-4 px-6">
                        <Button
                            variant={"outline"}
                            className="cursor-pointer"
                            name="refresh"
                            type="button"
                            onClick={handleRefresh}
                            disabled={isLoading}
                        >
                            Refresh
                        </Button>
                        <Button
                            variant={"outline"}
                            className="cursor-pointer"
                            name="generate"
                            type="button"
                            onClick={handleGenerate}
                            disabled={isLoading}
                        >
                            {isLoading ? "Generating" : "Generate"}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
