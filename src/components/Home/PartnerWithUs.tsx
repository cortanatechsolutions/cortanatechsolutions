const links = [
  {
    name: "We create website for your business",
    href: "https://blog.cortanatechsolutions.com/we-create-websites-for-your-business",
  },
  {
    name: "Setup your professional email",
    href: "https://blog.cortanatechsolutions.com/we-can-help-you-setup-your-professional-email",
  },
  {
    name: "Build chatbot",
    href: "https://blog.cortanatechsolutions.com/we-build-chatbots-for-your-business",
  },
  {
    name: "We build any custom web application",
    href: "https://blog.cortanatechsolutions.com/we-build-any-custom-web-application",
  },
];

export default function PartnerWithUs() {
  return (
    <div
      id="PartnerWithUs"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/images/workwithus.jpg`}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Partner with Us
          </h2>
          <p className="mt-6 text-lg leading-8 text-white">
            Explore how we can bring value to your projects. Our team is
            committed to delivering exceptional services tailored to your needs.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="transition hover:text-blue-500 hover:text-blue-400"
              >
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>

          <h2 className="mx-auto mt-10 text-white max-w-2xl lg:mx-0 lg:max-w-none">
            You can have confidence in our services, as we utilize the latest
            technology in the industry:
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-6 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            <img
              alt="Azure"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/150px-Microsoft_Azure.svg.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="CSharp"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/256px-Logo_C_sharp.svg.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="React"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/270px-React-icon.svg.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Javascript"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/240px-Unofficial_JavaScript_logo_2.svg.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="VisualStudio"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Visual_Studio_Icon_2022.svg/193px-Visual_Studio_Icon_2022.svg.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <img
              alt="WordPress"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/512px-WordPress_blue_logo.svg.png"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
