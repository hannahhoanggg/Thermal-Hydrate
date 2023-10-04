export default function Advertisement() {
  return (
    <div className="flex-row w-screen px-10 py-5 mt-10 bg-pink-100 columns-3">
      <img
        src="/images/reuse.jpg"
        alt="reuse"
        className="object-scale-down h-20"
      />
      <h2 className="text-lg text-violet-400">Say yes to refills</h2>
      <p className="text-xs">
        Replenish your reusable water bottle with clean, refreshing water from a
        trusted source
      </p>
      <img
        src="/images/motto.jpg"
        alt="motto"
        className="object-scale-down h-20"
      />
      <h2 className="text-lg text-violet-400">Hydrate with purpose</h2>
      <p className="text-xs">
        Reduce single-use plastic bottles & promoting eco-friendly hydration
      </p>
      <img
        src="/images/premium.jpg"
        alt="premium water bottle"
        className="object-scale-down h-20"
      />
      <h2 className="text-lg text-violet-400">Sip smart, live well</h2>
      <p className="text-xs">
        Discover the pinnacle of hydration with our collection of premium water
        bottles. Elevate your daily refreshment with style and sustainability.
      </p>
    </div>
  );
}
