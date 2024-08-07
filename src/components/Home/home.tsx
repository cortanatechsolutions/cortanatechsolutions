import { useState } from "react";
import ModalForm from "../core/ContactFormModal";

interface JumbotronProps {
  data: {
    title: string;
    description: string;
    button: { text: string; href: string };
  };
}

const Home: React.FC<JumbotronProps> = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <section id="Home" className="overflow-hidden py-10 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <div className="text-left">
                <p className="text-base leading-7 text-theme-royalBlue">
                  Welcome to Cortanatech Solutions!
                </p>
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {data.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {data.description}
                </p>
                <div className="mt-10 flex items-center justify-left gap-x-6">
                  <button
                    onClick={openModal}
                    className="btn btn-primary"
                    data-modal-toggle="#modalForm"
                  >
                    {data.button.text}
                  </button>
                  <a
                    href="https://blog.cortanatechsolutions.com"
                    className="btn btn-outline btn-primary"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={`${process.env.PUBLIC_URL}/images/welcome-image.jpg`}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default Home;
