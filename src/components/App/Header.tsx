import { SidebarTrigger } from "../ui/sidebar";

function Header() {
    return (
        <div className="w-full h-[50px] border-b border-b-gray-300 flex items-center">
            <SidebarTrigger />
            <div className="w-full text-center text-xl font-bold">Hello</div>
        </div>
    );
}

export default Header;
