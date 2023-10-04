import Banner from './components/Banner';
import NavBar from './components/NavBar';
import BodyBanner from './components/BodyBanner';
import Advertisement from './components/Advertisement';

export default function App() {
  return (
    <div>
      <Banner />
      <NavBar />
      <h3 className="mt-10 text-2xl font-medium text-center">
        Shop different brands!
      </h3>
      <a
        href=""
        className="flex justify-center py-1 text-lg font-normal underline cursor-pointer decoration-cyan-500 text-cyan-500">
        Shop Now
      </a>
      <BodyBanner />
      <Advertisement />
    </div>
  );
}
