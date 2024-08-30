import React from "react";

const Contact = () => {
  return (
    <section id="contact">
      <h1 className="flex flexCenter bg-opacity-50 bg-white pt-8 text-black font-bold mb-4 lg:m-10 regular-24 xl:regular-40">
        Contact
      </h1>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116078.16872066545!2d73.62246994767459!3d24.608419845636824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56550a14411%3A0xdbd8c28455b868b0!2sUdaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1723204962769!5m2!1sen!2sin"
        width="600"
        height="450"
        className="w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      >
      </iframe>
    </section>
  );
};

export default Contact;
