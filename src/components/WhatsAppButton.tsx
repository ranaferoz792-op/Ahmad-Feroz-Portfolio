import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/923238475516"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;

// import { FaWhatsapp } from "react-icons/fa";

// const WhatsAppButton = () => {
//   return (
//     <a
//       href="https://chat.whatsapp.com/IgKFWOBAyOTKYSPaQwOxbW"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="fixed right-4 bottom-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
//     >
//       <FaWhatsapp size={30} />
//     </a>
//   );
// };

// export default WhatsAppButton;