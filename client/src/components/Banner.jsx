export default function Banner() {
  return (
    <div className="flex items-center justify-center w-screen mx-auto bg-rose-200">
      <img
        src="/images/logo.jpg"
        alt="logo"
        className="object-scale-down h-20"
      />
      <h1 className="px-10 text-3xl font-medium">THERMAL HYDRATE</h1>
    </div>
  );
}
