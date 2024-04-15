import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

function Imprint() {
  const [openImprintModal, setOpenImprintModal] = useState(false);

  return (
    <>
      <Button
        className="text-text-300 hover:bg-secondary-600 hover:text-text-100"
        onClick={() => setOpenImprintModal(true)}
      >
        Imprint
      </Button>
      <Modal
        show={openImprintModal}
        className="flex w-1/2 h-fit justify-center bg-background-600 border-primary-500 mx-auto mt-28"
        popup
        onClose={() => setOpenImprintModal(false)}
      >
        <Modal.Header />
        <Modal.Body className="text-text-50">
          <div className="space-y-6">
            <h2>Imprint</h2>
            <p>
              This website is operated by Uiyoung Kim.
            </p>
            <p>
              Contact:
            </p>
            <ul>
              <li>Email: Uiyoungkim2002@gmail.com</li>
            </ul>
            <p>
              Address:
            </p>
            <p>
              Hardwaldring 31, 68723 Oftersheim
            </p>
            <p>
              Developers:
            </p>
            <ul>
              <li>Sean Tyler Straub</li>
              <li>Uiyoung Kim</li>
            </ul>
            <p>
              Please note that this website is for educational purposes only and may not reflect real-world functionality or data. 
              By using this website, you agree to abide by all applicable laws and regulations.
            </p>
            <div className="w-full">
              <Button
                className="text-primary-200 hover:text-primary-50 bg-background-800 hover:bg-primary-400"
                onClick={() => {
                  setOpenImprintModal(false);
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

export default Imprint;
