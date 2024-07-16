const OurWork: React.FC = () => {
  return (
    <div id="OurWork" className="overflow-hidden bg-lightGray py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                See Our Work
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Baptist Bible Seminary and Institute, Inc.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Baptist Bible Seminary and Institute – College is a theological
                institution committed to develop called men and women through
                sound biblical training to effectively make Christ known to the
                world. We developed a website that serves as their school
                brochure for prospect students seeking a Christian college
                education.
              </p>
              <div className="mt-10 flex items-center justify-left gap-x-6">
                <a
                  href="https://bbsi.edu.ph/"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  See it in action
                </a>
                <a
                  href="https://blog.cortanatechsolutions.com/"
                  className="transition hover:text-blue-500 hover:text-blue-400 text-sm font-semibold leading-6 text-gray-900"
                >
                  See other works <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={`${process.env.PUBLIC_URL}/images/bbsi.png`}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
};

export default OurWork;
