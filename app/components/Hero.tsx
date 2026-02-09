import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Hero Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md md:max-w-lg">
              <Image
                src="/hero-image.png"
                alt="customised Otaku anime clothing"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1 md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              From The Screen <br className="hidden md:block" />
              <span className="text-gray-600">To The Streets</span>
            </h1>
            <p className="md:text-lg lg:text-xl text-gray-600 mb-8 max-w-lg md:mx-0">
              Premium anime streetwear for fans who actually live it. 
              Bold prints, clean cuts, real style.
            </p>
            <Link 
              href="/shop"
              className="inline-block bg-primary text-white px-8 py-4 rounded-md text-lg font-semibold bg-primary-hover transition-all shadow-lg hover:shadow-xl"
            >
              Shop Now
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
