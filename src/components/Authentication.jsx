import React, { useRef, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

function Authentication() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!email || !password) {
      setEmailError(!email ? "Email field cannot be empty." : "");
      setPasswordError(!password ? "Password field cannot be empty." : "");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setEmailError("");
    setPasswordError("");
    setOpenLoginModal(false);
  };

  const handleRegister = () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const username = usernameInputRef.current.value;

    if (!email || !password || !username) {
      setEmailError(!email ? "Email field cannot be empty." : "");
      setPasswordError(!password ? "Password field cannot be empty." : "");
      setUsernameError(!username ? "Username field cannot be empty." : "");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
    setOpenRegisterModal(false);
    setOpenLoginModal(true);
  };

  return (
    <>
      <Button
        className="text-text-300 hover:bg-secondary-600 hover:text-text-100"
        onClick={() => {
          setOpenLoginModal(true);
          setOpenRegisterModal(false);
        }}
      >
        Sign in
      </Button>
      <Button
        className="text-text-300 hover:bg-secondary-600 hover:text-text-100"
        onClick={() => {
          setOpenRegisterModal(true);
          setOpenLoginModal(false);
        }}
      >
        Create account
      </Button>

      <Modal
        show={openLoginModal}
        className="flex w-1/4 h-fit justify-center bg-background-600 border-primary-500 mx-auto mt-32 text-text-50"
        popup
        onClose={() => setOpenLoginModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium">
              Sign in to your InnoAssist Account
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                type="email"
                id="email"
                ref={emailInputRef}
                placeholder="John-Cena@WWE.com"
                required
                className="text-text-800"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                ref={passwordInputRef}
                placeholder="123"
                required
                className="text-text-800"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <div className="w-full">
              <Button
                className="bg-primary-200 hover:bg-primary-400"
                onClick={handleLogin}
              >
                Log in to your account
              </Button>
              <Button
                className="text-primary-200 hover:text-primary-100"
                onClick={() => {
                  setOpenLoginModal(false);
                }}
              >
                Close
              </Button>
            </div>
            <div className="flex justify-center mt-4 ">
              <Button
                className="hover:text-primary-300"
                onClick={() => {
                  setOpenLoginModal(false);
                  setOpenRegisterModal(true);
                }}
              >
                Don't have an account? Register
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openRegisterModal}
        className="flex w-1/4 h-fit justify-center bg-background-600 border-primary-500  mx-auto mt-32 text-text-50"
        popup
        onClose={() => setOpenRegisterModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium">
              Create your InnoAssist Account
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                ref={emailInputRef}
                placeholder="John-Cena@WWE.com"
                required
                className="text-text-800"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                ref={passwordInputRef}
                placeholder="123"
                required
                className="text-text-800"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                ref={usernameInputRef}
                placeholder="John Cena"
                required
                className="text-text-800"
              />
              {usernameError && <p className="text-red-500">{usernameError}</p>}
            </div>
            <div className="w-full">
              <Button
                className="bg-primary-200 hover:bg-primary-400"
                onClick={handleRegister}
              >
                Create account
              </Button>
              <Button
                className="text-primary-200 hover:text-primary-100"
                onClick={() => {
                  setOpenRegisterModal(false);
                }}
              >
                Close
              </Button>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                className="hover:text-primary-300"
                onClick={() => {
                  setOpenRegisterModal(false);
                  setOpenLoginModal(true);
                }}
              >
                Already have an account? Sign in
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Authentication;
