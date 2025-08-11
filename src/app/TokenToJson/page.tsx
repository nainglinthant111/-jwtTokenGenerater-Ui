import TokenToJson from "@/components/App/tokentojson";
import React from "react";
function page() {
    return (
        <div className="w-full flex flex-col justify-center overflow-y-scroll h-full">
            <div className="w-full h-full p-2 md:p-8 mx-auto lg:w-[780px]">
                <h1 className="text-2xl underline">JWT Token To Json</h1>
                <p className="text-sm text-gray-500 text-justify mt-4">
                    Enter your Token and the secret key to generate a decript to
                    Json. Secret key example:{" "}
                    <code>/j44lLupiqS+nce1Raeldw==</code>
                </p>
                <TokenToJson />
            </div>
        </div>
    );
}

export default page;
