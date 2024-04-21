import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

function Imprint() {
  //Using the Modal Component from Flowbite
  const [openImprintModal, setOpenImprintModal] = useState(false);

  return (
    <>
      <Button
        className="text-text-300 hover:bg-secondary-600 hover:text-text-100"
        onClick={() => setOpenImprintModal(!openImprintModal)}
      >
        Imprint
      </Button>
      <Modal
        show={openImprintModal}
        className="flex w-3/4 h-fit justify-center bg-background-600 border-primary-500 mx-auto mt-28"
        popup
        onClose={() => setOpenImprintModal(false)}
      >
        <Modal.Header />
        <Modal.Body className="text-text-50">
          <div className="space-y-6">
            <h2>Imprint</h2>
            <p>This website is operated by Uiyoung Kim.</p>
            <p>Email: Uiyoungkim2002@gmail.com</p>

            <p>Address: Hardwaldring 31, 68723 Oftersheim</p>
            <p>Developers:</p>
            <ul>
              <li>Sean Tyler Straub</li>
              <li>Uiyoung Kim</li>
            </ul>
            <p>
              Please note that this website is for educational purposes only and
              may not reflect real-world functionality or data. By using this
              website, you agree to abide by all applicable laws and
              regulations.
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
