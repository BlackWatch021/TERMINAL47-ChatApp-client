import { SquareTerminal } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bottomBorder">
      <div className="flex gap-2 items-center">
        <SquareTerminal color="#00ff41" size={25} />
        <h1 className="font-extrabold font-mono text-md md:text-xl">
          TERMINAL47
        </h1>
      </div>
      <div>
        {/* <span className="text-xs font-semibold text-white">
          Room Id : 2342345534334223
        </span> */}
      </div>
    </nav>
  );
};

export default Navbar;
