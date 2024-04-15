import React, { useRef, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

function Contact() {
  const [openContactModal, setOpenContactModal] = useState(false);
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const messageInputRef = useRef();
  const subjectInputRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleContact = () => {
    const email = emailInputRef.current.value;
    const message = messageInputRef.current.value;
    const username = usernameInputRef.current.value;
    const subject = subjectInputRef.current.value;

    console.log(email, message, username, subject);

    if (!email || !message || !username || subject === "") {
      setEmailError(!email ? "Email field cannot be empty." : "");
      setMessageError(!message ? "Please enter a message." : "");
      setUsernameError(!username ? "Username field cannot be empty." : "");
      setSubjectError(!subject ? "Please select a subject." : "");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    fetch("/api/email/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: `InnoAssist Contact Form about ${subject}`,
        body: `Email: ${email} \n Username: ${username} \n Message: ${message}`,
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
    setMessageError("");
    setUsernameError("");
    setSubjectError("");
    setOpenContactModal(false);
  };

  return (
    <>
      <Button
        className="text-text-300 hover:bg-secondary-600 hover:text-text-100"
        onClick={() => setOpenContactModal(true)}
      >
        Contact us
      </Button>
      <Modal
        show={openContactModal}
        className="flex w-1/4 h-fit justify-center bg-background-600 border-primary-500 mx-auto mt-28"
        popup
        onClose={() => setOpenContactModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body className="text-text-50">
          <div className="space-y-6">
            <h2>
              Use this Form if you want to unlock your Account for usage of
              InnoAssist
            </h2>
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
            <div>
              <Label value="Subject" />
              <select
                className="flex text-sm w-full mt-2 text-text-800 rounded-md focus:ring-primary-600 focus:border-primary-600 border-background-300"
                name="subject"
                id="subject"
                ref={subjectInputRef}
              >
                <option selected value="">
                  Select a subject
                </option>
                <option value="account">Account</option>
                <option value="feedback">Feedback</option>
                <option value="issue">Issue</option>
                <option value="other">Other</option>
              </select>
              {subjectError && <p className="text-red-500">{subjectError}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Your message" />
              </div>
              <textarea
                id="message"
                ref={messageInputRef}
                required
                placeholder="Please upgrade my Account"
                className="block text-sm w-full text-text-800 border-background-300 rounded-md shadow-sm focus:ring-primary-600 focus:border-primary-600"
              />
              {messageError && <p className="text-red-500">{messageError}</p>}
            </div>
            <div className="w-full">
              <Button
                className="bg-primary-200 hover:bg-primary-400"
                onClick={handleContact}
              >
                Send message
              </Button>
              <Button
                className="text-primary-200 hover:text-primary-50 bg-background-700 hover:bg-primary-400 mt-2"
                onClick={() => {
                  setOpenContactModal(false);
                  setEmailError(false);
                    setUsernameError(false);
                    setSubjectError(false);
                    setMessageError(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Contact;
