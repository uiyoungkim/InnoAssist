import Authentication from "./Authentication";

function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-lg w-full">
      <div className="w-full px-2 h-16 flex">
        <div className="w-full space-x-5 flex items-center justify-center">
          <img
            className="h-12 w-auto" 
            src="/logo.innoAssist.png"
            alt="Logo"
          />
          
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </a>
        <Authentication />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;