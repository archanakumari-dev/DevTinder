import React, { useState } from "react";
import { Link, useNavigate ,NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const NavBar = () => {
  const [login, setLogin] = useState(false);

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="w-full flex items-center justify-between px-10 md:px-16 py-3 transition-all duration-300">
        <div className="flex items-center">
          <NavLink
            to="/"
            className={({isActive})=>`text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 ${isActive?"border-b-2 border-blue-500 pb-1":""} `}
          >
           DEVTINDER
          </NavLink>
        </div>

        {user && (
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
            <Link
              to="/feed"
              className="hover:text-indigo-600 transition-colors duration-200"
            >
              Feed
            </Link>
            <Link
              to="/connections"
              className="hover:text-indigo-600 transition-colors duration-200 "
            >
              Connections
            </Link>
            <Link
              to="/requests"
              className="hover:text-indigo-600 transition-colors duration-200"
            >
              Requests
            </Link>
          </div>
        )}

        {/* Right: Profile Section */}
        {user && (
          <div className="flex items-center gap-3">
            <p className="font-semibold text-gray-800 hidden sm:block px-2 py-1 border-purple-500">
              {user?.firstName}
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border-2 border-indigo-500">
                  <img
                    alt="Profile"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/feed">Feed</Link>
                </li>
                <li className="text-red-600">
                  <a
                    onClick={async () => {
                      try {
                        await axios.post(
                          "http://localhost:3000/logout",
                          {},
                          { withCredentials: true }
                        );
                        dispatch(removeUser());
                        navigate("/login");
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
