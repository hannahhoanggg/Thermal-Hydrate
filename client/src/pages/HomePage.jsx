import BodyBanner from '../components/BodyBanner';
import Advertisement from '../components/Advertisement';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h3 className="mt-10 text-2xl font-medium text-center">
        Shop different brands!
      </h3>
      <div>
        <Link
          to="/catalog"
          className="flex justify-center py-1 text-lg font-normal underline cursor-pointer decoration-cyan-500 text-cyan-500">
          Shop Now
        </Link>
      </div>
      <BodyBanner />
      <Advertisement />
    </div>
  );
}
