import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

function Legal() {
  const [openLegalModal, setOpenLegalModal] = useState(false);

  return (
    <>
      <Button
        className="text-text-300 hover:bg-secondary-600 hover:text-text-100"
        onClick={() => setOpenLegalModal(!openLegalModal)}
      >
        Legal
      </Button>
      <Modal
        show={openLegalModal}
        className="flex w-3/4 h-fit justify-center bg-background-600 border-primary-500 mx-auto mt-28"
        popup
        onClose={() => setOpenLegalModal(false)}
      >
        <Modal.Header />
        <Modal.Body className="text-text-50">
          <div className="space-y-6">
            <h2>Legal Information</h2>
            <p>
              This website is provided for informational and educational purposes only. Its content is not intended to constitute legal, financial, or professional advice.
            </p>
            <p>
              By accessing or using this website, you acknowledge and agree that:
            </p>
            <ul>
              <li>The information on this website is provided "as is" and without warranties of any kind.</li>
              <li>Your use of this website is at your own risk, and you assume full responsibility for any consequences arising from such use.</li>
              <li>We do not guarantee the accuracy, completeness, or reliability of any information provided on this website.</li>
              <li>We are not liable for any damages or losses resulting from your use of, or reliance on, the information contained on this website.</li>
            </ul>
            <p>
              Furthermore, we take data security seriously and implement reasonable measures to protect your personal information. However, we cannot guarantee the security of any information transmitted over the internet.
            </p>
            <p>
              By continuing to use this website, you agree to abide by all applicable laws and regulations.
            </p>
            <div className="w-full">
              <Button
                className="text-primary-200 hover:text-primary-50 bg-background-800 hover:bg-primary-400"
                onClick={() => {
                  setOpenLegalModal(false);
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

export default Legal;
