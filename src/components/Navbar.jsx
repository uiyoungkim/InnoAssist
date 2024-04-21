import Authentication from "./Authentication";
import Contact from "./Contact";
import Imprint from "./Imprint";
import Legal from "./Legal";

//Passing updateChatLog through to the Authentication Component
function Navbar({ updateChatLog }) {
  //Combine Components into the Navbar
  return (
    <nav className="bg-gray-800 shadow-lg w-full fixed top-0 z-50">
      <div className="w-full px-2 h-16 flex">
        <div className="w-full space-x-5 flex items-center justify-center">
          <img
            className="h-full w-auto"
            src="/innoassist_logo_transparent.png"
            alt="Logo"
          />
          <Legal />
          <Imprint />
          <Contact />
          <Authentication updateChatLog={updateChatLog} />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
