import Authentication from "./Authentication";
import Contact from "./Contact";

const handleLogout = () => {
  fetch('http://localhost:3000/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'logout'
  }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

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
              className="text-text-300 hover:bg-secondary-600 hover:text-text-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
           <Contact/>
        <Authentication />
        <button
          onClick={handleLogout}
          className="text-text-300 hover:bg-secondary-600 hover:text-text-100 px-3 py-2 rounded-md text-sm font-medium"
        >
          Logout
        </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;