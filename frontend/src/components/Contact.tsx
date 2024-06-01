// src/components/Contact.tsx
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <NavBar />
      <div className="w-[100%] pt-16">
        <main className="container mx-auto p-4 bg-white shadow-md mt-4 w-full lg:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            <p>TrendVault GmbH</p>
            <p>Email: kontakt@trendvault.de</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 456 Innovation Drive, Tech City, TX 75001, USA</p>
            <p>Customer Support: support@trendvault.de</p>
          </section>

          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Our Story</h3>
            <p>
              TrendVault Webshop was founded in 2024 by the two passionate
              entrepreneurs Masoud and Niklas, who wanted to revolutionize the
              way people shop online. Our journey began in a small garage in
              Stuttgart, where we started selling handmade crafts and unique
              items. The response was overwhelming, and we quickly realized the
              potential to expand our offerings.
            </p>
            <p className="mt-4">
              With a vision to create a one-stop online shop for all your needs,
              we invested in the latest technology and built a robust platform
              that ensures a seamless shopping experience. Today, TrendVault
              Webshop offers a wide range of products, from electronics to home
              decor, catering to customers all over the world.
            </p>
            <p className="mt-4">
              Our mission is to provide high-quality products at competitive
              prices while maintaining exceptional customer service. We believe
              in building lasting relationships with our customers, and our
              dedicated team works tirelessly to ensure that every order is
              processed with care and attention to detail.
            </p>
            <p className="mt-4">
              Join us on our journey as we continue to innovate and bring you
              the best online shopping experience. Thank you for choosing
              TrendVault Webshop!
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
