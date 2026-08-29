import { Link, NavLink } from "react-router-dom";
import SearchBar from "./searchBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="border-b border-white/10 bg-black/95 px-4 py-4 shadow-2xl shadow-black/40 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3">
        <div className="shrink-0 text-2xl font-black tracking-[-0.06em] text-[#e50914] sm:text-3xl">
          MOVIEFLIX
        </div>
        <div className="order-3 flex w-full gap-8 border-t border-white/10 pt-2 sm:order-2 sm:w-auto sm:border-0 sm:pt-0">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${isActive ? "text-white" : "text-gray-400"} "px-3 py-2 text-sm font-medium transition hover:text-white`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/moviespage"}
            className={({ isActive }) =>
              `${isActive ? "text-white" : "text-gray-400"} "px-3 py-2 text-sm font-medium transition hover:text-white`
            }
          >
            Movies
          </NavLink>
          <NavLink
            to={"/tvshowspage"}
            className={({ isActive }) =>
              `${isActive ? "text-white" : "text-gray-400"} "px-3 py-2 text-sm font-medium transition hover:text-white`
            }
          >
            TV Shows
          </NavLink>
          <NavLink
            to={"/favorites"}
            className={({ isActive }) =>
              `${isActive ? "text-white" : "text-gray-400"} "px-3 py-2 text-sm font-medium transition hover:text-white`
            }
          >
            Favorites
          </NavLink>
        </div>
        <div className="order-2 ml-auto sm:order-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
