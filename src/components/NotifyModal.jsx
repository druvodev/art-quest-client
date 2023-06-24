import { useEffect, useState } from "react";
import { MdContentCopy, MdCheckCircle } from "react-icons/md";

const NotifyModal = () => {
  const [copySuccess1, setCopySuccess1] = useState(false);
  const [copySuccess2, setCopySuccess2] = useState(false);
  const [copySuccess3, setCopySuccess3] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.my_modal_3.showModal();
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = (text, setCopySuccess) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopySuccess(true))
      .catch((error) => console.error("Copy failed:", error));
  };

  const handleClose = () => {
    const modal = document.getElementById("my_modal_3");
    modal.close();
  };

  return (
    <dialog id="my_modal_3" className="modal bg-black bg-opacity-60">
      <div className="modal-box max-w-xl bg-white rounded-lg p-4 shadow-md">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-800"
          onClick={handleClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Login Information</h3>
        <hr className="mb-4" />
        <p className="py-1 flex items-center">
          <span className="mr-2 text-gray-700">Instructor:</span>
          <span className="text-blue-500 break-all">
            prodip@gmail.com
            <button
              className={`ml-2 text-blue-500 ${
                copySuccess1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-700"
              }`}
              onClick={() => handleCopy("prodip@gmail.com", setCopySuccess1)}
              disabled={copySuccess1}
            >
              {copySuccess1 ? <MdCheckCircle /> : <MdContentCopy />}
            </button>
          </span>
        </p>
        <p className="pb-2 flex items-center">
          <span className="mr-2 text-gray-700">Admin:</span>
          <span className="text-blue-500 break-all">
            admin@gmail.com
            <button
              className={`ml-2 text-blue-500 ${
                copySuccess2
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-700"
              }`}
              onClick={() => handleCopy("admin@gmail.com", setCopySuccess2)}
              disabled={copySuccess2}
            >
              {copySuccess2 ? <MdCheckCircle /> : <MdContentCopy />}
            </button>
          </span>
        </p>
        <p className="pb-2 flex items-center">
          <span className="mr-2 text-gray-700">Password:</span>
          <span className="text-blue-500 break-all">
            pRo@99
            <button
              className={`ml-2 text-blue-500 ${
                copySuccess3
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-blue-700"
              }`}
              onClick={() => handleCopy("pRo@99", setCopySuccess3)}
              disabled={copySuccess3}
            >
              {copySuccess3 ? <MdCheckCircle /> : <MdContentCopy />}
            </button>
          </span>
        </p>
        <p className="text-rose-500 mt-4">
          *
          <small>
            Please note this information for specific role-based login.
          </small>
        </p>
      </div>
    </dialog>
  );
};

export default NotifyModal;
