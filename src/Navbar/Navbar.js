import AnimatedLogo from "./AnimatedLogo/AnimatedLogo";

export default function Navbar() {
    return (
        <div className="w-full bg-black h-[55px] flex justify-between items-center text-white px-4 ">
            <AnimatedLogo/>
            <div className="p-2 font-semibold text-base">
                <h1>Testeo en fabricjs</h1>
            </div>
        </div>
    );
}

