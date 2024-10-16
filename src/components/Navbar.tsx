import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { observer } from "mobx-react-lite";
import { store } from "../store/Store";

interface Props {
  isNavbarExpanded: boolean;
  setIsNavbarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Props> = observer(
  ({ isNavbarExpanded, setIsNavbarExpanded }) => {
    const navRef = useRef<HTMLElement>(null);

    const expandNavbar = () => {
      setIsNavbarExpanded(!isNavbarExpanded);
      navRef.current?.classList.toggle("expanded");
    };

    return (
      <nav ref={navRef}>
        <div className="navbar-logo">
          <NavLink to="/">Beer Rate</NavLink>
        </div>

        <div className="navbar-items">
          <ul>
            <li>
              <NavLink to="/menu1" className="navbar-link">
                Menu 1
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu2" className="navbar-link">
                Menu 2
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu3" className="navbar-link">
                Menu 3
              </NavLink>
            </li>
          </ul>

          <div className="login-container">
            {store.authStore.isLoggedIn ? (
              <NavLink to="/profile" className="navbar-link">
                {store.authStore.username}
              </NavLink>
            ) : (
              <></>
            )}

            {store.authStore.isLoggedIn ? (
              <div
                onClick={() => store.authStore.logout()}
                className="navbar-link"
              >
                Wyloguj się
              </div>
            ) : (
              <>
                <NavLink to="/register" className="navbar-link">
                  Zarejestruj się
                </NavLink>
                <NavLink to="/login" className="navbar-link">
                  Zaloguj się
                </NavLink>
              </>
            )}
          </div>
        </div>

        <button
          className="navbar-button expand-navbar-button"
          onClick={expandNavbar}
        >
          <FaBars />
        </button>

        <button
          className="navbar-button collapse-navbar-button"
          onClick={expandNavbar}
        >
          <FaTimes />
        </button>
      </nav>
    );
  }
);

export default Navbar;
