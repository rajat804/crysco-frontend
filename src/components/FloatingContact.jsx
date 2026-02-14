import { FaWhatsapp, FaPhoneAlt, FaComments } from "react-icons/fa";
import { useState } from "react";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* WhatsApp Button */}
      {open && (
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition duration-300"
        >
          <FaWhatsapp />
          WhatsApp
        </a>
      )}

      {/* Call Button */}
      {open && (
        <a
          href="tel:+91"
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition duration-300"
        >
          <FaPhoneAlt />
          Call Now
        </a>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-emerald-600 text-white p-4 rounded-full shadow-xl hover:bg-emerald-700 transition duration-300"
      >
        <FaComments size={20} />
      </button>

    </div>
  );
};

export default FloatingContact;
