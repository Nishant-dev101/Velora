import { Link } from "react-router-dom";
import SearchBar from "./searchBar";

const Navbar = () => {
  return (
    <nav className="border-b border-white/10 bg-black/95 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3">
        <div className="shrink-0 text-2xl font-black tracking-[-0.06em] text-[#e50914] sm:text-3xl">
          <Link to="/">MOVIEFLIX</Link>
        </div>
        <div className="order-3 flex w-full gap-1 border-t border-white/10 pt-2 sm:order-2 sm:w-auto sm:border-0 sm:pt-0">
          <Link
            to="/"
            className="px-3 py-2 text-sm font-medium text-white transition hover:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#e50914]"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="px-3 py-2 text-sm font-medium text-white/60 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#e50914]"
          >
            Favorites
          </Link>
        </div>
        <div className="order-2 ml-auto sm:order-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
