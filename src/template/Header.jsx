// src/template/Header.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartDrawer from "../orders/CartDrawer.jsx";

function Header() {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cartItems]);

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  return (
      <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" onClick={changeNav}>
              <FontAwesomeIcon
                  icon={["fab", "bootstrap"]}
                  className="ms-1"
                  size="lg"
              />
              <span className="ms-2 h5">Shop</span>
            </Link>

            <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? 'open' : '')}>
              <ul className="navbar-nav me-auto mb-lg-0">
                <li className="nav-item">
                  <Link to="/products" className="nav-link" replace onClick={changeNav}>
                    Explore
                  </Link>
                </li>
              </ul>
              <button type="button" className="btn btn-outline-dark me-3 d-none d-lg-inline" onClick={toggleCart}>
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                <span className="ms-3 badge rounded-pill bg-dark">{cartQuantity}</span>
              </button>
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                      href="!#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={["fas", "user-alt"]} />
                  </a>
                  <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="userDropdown"
                  >
                    {user ? (
                        <li>
                          <button className="dropdown-item" onClick={logout}>
                            Log Out
                          </button>
                        </li>
                    ) : (
                        <>
                          <li>
                            <Link to="/login" className="dropdown-item" onClick={changeNav}>
                              Log In
                            </Link>
                          </li>
                          <li>
                            <Link to="/register" className="dropdown-item" onClick={changeNav}>
                              Sign Up
                            </Link>
                          </li>
                        </>
                    )}
                  </ul>
                </li>
              </ul>
            </div>

            <div className="d-inline-block d-lg-none">
              <button type="button" className="btn btn-outline-dark" onClick={toggleCart}>
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                <span className="ms-3 badge rounded-pill bg-dark">{cartQuantity}</span>
              </button>
              <button className="navbar-toggler p-0 border-0 ms-3" type="button" onClick={toggleDrawer}>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>
        {isCartOpen && <CartDrawer isOpen={isCartOpen} toggleDrawer={toggleCart} />}
      </header>
  );
}

export default Header;