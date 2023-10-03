export default function Banner() {
  return (
    <div className="w-screen flex items-center justify-center mx-auto bg-rose-200">
      <img
        src="/images/logo.jpg"
        alt="logo"
        className="object-scale-down h-20"
      />
      <h1 className="font-medium text-3xl px-10">THERMAL HYDRATE</h1>
    </div>
  );
}
