import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ModalForm from "./ContactFormModal";

interface NavbarProps {
  data: {
    brand: string;
    links: { name: string; href: string }[];
  };
}

const Navbar: React.FC<NavbarProps> = ({ data }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.startsWith("#") ? href.substring(1) : null;

    if (location.pathname !== "/" && targetId) {
      // If the user is not on the homepage, navigate to the homepage and scroll to the section
      navigate(`/${href}`);
    } else if (targetId) {
      // If the user is already on the homepage, smooth scroll to the section
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "sticky bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{data.brand}</span>
            <img alt="" src={`/default-logo.svg`} className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {data.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm py-2 font-heading leading-6 text-gray-900 hover:text-theme-royalBlue"
            >
              {link.name}
            </a>
          ))}
          <button onClick={openModal} className="btn btn-primary">
            Get Started
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{data.brand}</span>
              <img alt="" src={`/default-logo.svg`} className="h-10 w-auto" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {data.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block px-3 py-2 text-base font-heading leading-7 text-gray-900 hover:text-theme-royalBlue"
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  onClick={() => {
                    openModal();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-primary"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Navbar;
