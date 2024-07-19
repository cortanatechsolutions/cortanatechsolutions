interface JumbotronProps {
  data: {
    title: string;
    description: string;
    button: { text: string; href: string };
  };
}

const Home: React.FC<JumbotronProps> = ({ data }) => {
  return (
    <div id="Home" className="overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <div className="text-left">
                <h2 className="text-base font-semibold leading-7 text-blue-600">
                  Welcome to Cortanatech Solutions!
                </h2>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {data.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {data.description}
                </p>
                <div className="mt-10 flex items-center justify-left gap-x-6">
                  <a
                    href={data.button.href}
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {data.button.text}
                  </a>
                  <a
                    href="https://blog.cortanatechsolutions.com"
                    className="transition hover:text-blue-500 hover:text-blue-400 text-sm font-semibold leading-6 text-gray-900"
                  >
                    Learn more <span aria-hidden="true">→</span>
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
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
