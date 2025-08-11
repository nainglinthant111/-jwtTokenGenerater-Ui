import { FileKey2, Home, RotateCcwKey, Braces } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Create Random Key",
        url: "/RandomToken",
        icon: RotateCcwKey,
    },
    {
        title: "Json To Token",
        url: "/JsonToToken",
        icon: FileKey2,
    },
    {
        title: "Token To Json",
        url: "/TokenToJson",
        icon: Braces,
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="border-gray-300 bg-gray-50">
            <SidebarContent className="bg-gray-50">
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="mx-0 w-full h-50 flex flex-col bg-gradient-to-tr from-emerald-700 to-emerald-600 text-white text-2xl font-semibold rounded-bl-6xl  pt-10  rounded-br-full">
                        <div className="pl-4 w-full">Token Generator</div>
                        <div className="text-sm pl-4 w-full">v1.0.0</div>
                    </SidebarGroupLabel>
                    <Separator />
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-4 mt-4">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
