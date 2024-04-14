import React, { useRef, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

function Authentication() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const handleLogin = () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleRegister = () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const username = usernameInputRef.current.value;

    fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Button className="text-text-100" onClick={() => setOpenLoginModal(true)}>Sign in</Button>
      <Button className="text-text-100" onClick={() => setOpenRegisterModal(true)}>Create account</Button>

      <Modal show={openLoginModal} className="flex w-1/4 h-1/2 justify-center border-primary-500 mx-auto pt-4" popup onClose={() => setOpenLoginModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-text-900">Sign in to your InnoAssist Account</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" ref={emailInputRef} placeholder="name@company.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" ref={passwordInputRef} required />
            </div>
            <div className="w-full">
              <Button className="bg-primary-500 hover:bg-primary-600" onClick={handleLogin}>Log in to your account</Button>
              <Button className="text-primary-500 hover:text-primary-600" onClick={() => { setOpenLoginModal(false)}}>Close</Button>
            </div>
            <div className="flex justify-center mt-4 ">
              <Button className="text-text-900" onClick={() => { setOpenLoginModal(false); setOpenRegisterModal(true); }}>Don't have an account? Register</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openRegisterModal} className="flex w-1/4 h-3/4 justify-center border-primary-500 mx-auto pt-4" popup onClose={() => setOpenRegisterModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-text-900">Create your InnoAssist Account</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" ref={emailInputRef} placeholder="name@company.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" ref={passwordInputRef} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput id="username" ref={usernameInputRef} placeholder="Your username" required />
            </div>
            <div className="w-full">
              <Button className="bg-primary-500 hover:bg-primary-600" onClick={handleRegister}>Create account</Button>
              <Button className="text-primary-500 hover:text-primary-600" onClick={() => { setOpenRegisterModal(false)}}>Close</Button>
            </div>
            <div className="flex justify-center mt-4">
              <Button className="text-text-900" onClick={() => { setOpenRegisterModal(false); setOpenLoginModal(true); }}>Already have an account? Sign in</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Authentication;