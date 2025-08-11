import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound, Braces, Repeat } from "lucide-react";

export default function Page() {
    return (
        <div className="w-full flex flex-col justify-start overflow-y-scroll h-full">
            <div className="w-full h-full p-4 md:p-8 mx-auto max-w-5xl">
                <section className="text-center py-6 md:py-10">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Token Generator Suite
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl mx-auto">
                        Securely generate secrets, create JWT tokens from JSON,
                        and decode tokens back to JSON. Built with modern UI and
                        crypto-grade randomness.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <Button asChild>
                            <a href="/RandomToken">Get Started</a>
                        </Button>
                        <Button
                            variant="outline"
                            asChild
                        >
                            <a href="/JsonToToken">Create JWT</a>
                        </Button>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    <Card className="border-gray-100">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <KeyRound /> Random Token
                            </CardTitle>
                            <CardDescription>
                                Generate secure random strings for secrets, API
                                keys, and salts.
                            </CardDescription>
                            <CardAction>
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <a href="/RandomToken">Open</a>
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                                <li>Crypto-grade randomness</li>
                                <li>One-click copy to clipboard</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-100">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Braces /> JSON → JWT
                            </CardTitle>
                            <CardDescription>
                                Enter key/value pairs and a secret to create a
                                signed JWT.
                            </CardDescription>
                            <CardAction>
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <a href="/JsonToToken">Open</a>
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                                <li>Add multiple claims</li>
                                <li>Refresh secret from generator</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-100 md:col-span-2 xl:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Repeat /> JWT → JSON
                            </CardTitle>
                            <CardDescription>
                                Decode a JWT using your secret and view the
                                payload as JSON.
                            </CardDescription>
                            <CardAction>
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <a href="/TokenToJson">Open</a>
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                                <li>Copy result with one click</li>
                                <li>Error handling for invalid tokens</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div>
    );
}
