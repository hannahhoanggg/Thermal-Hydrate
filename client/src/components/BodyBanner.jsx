export default function BodyBanner() {
  return (
    <div className="relative bg-local">
      <img
        src="/images/background.jpg"
        alt="background"
        className="w-full h-60"
      />
      <div className="absolute top-0">
        <h2 className="text-3xl italic text-center">
          Stay Refreshed, Go Green!
        </h2>
        <p className="font-serif text-lg leading-none text-justify text-blue-900">
          The purpose of our website is to offer a curated selection of
          high-quality thermal water bottles designed to keep your beverages at
          the perfect temperature. We are dedicated to promoting sustainable
          living by providing eco-friendly alternatives to single-use plastic
          bottles. Our mission is to help you stay refreshed while reducing
          plastic waste, making it easy and stylish to enjoy your favorite
          beverages while contributing to a healthier planet.
        </p>
      </div>
    </div>
  );
}
