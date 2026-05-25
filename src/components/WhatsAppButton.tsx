import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
         href="https://wa.me/923238475516?text=Hi%20Ahmad%20%20I%20just%20viewed%20your%20portfolio%20and%20I’m%20interested%20in%20your%20web%20development%20services."
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