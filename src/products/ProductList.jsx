// src/products/ProductList.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product from "./Product.jsx";
import ProductH from "./ProductH.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount.jsx";
import { fetchProducts, fetchProductById } from "../hooks/useProducts.js";

const categories = [
  "All Products",
  "Phones & Tablets",
  "Cases & Covers",
  "Screen Guards",
  "Cables & Chargers",
  "Power Banks",
];

const disponibilidad = ["Disponible", "No disponible"];

function FilterMenuLeft({ minPrice, setMinPrice, maxPrice, setMaxPrice, applyFilters, availability, setAvailability }) {
  return (
      <ul className="list-group list-group-flush rounded">
        <li className="list-group-item">
          <h5 className="mt-1 mb-1">Disponibilidad</h5>
          <div className="d-flex flex-column">
            {disponibilidad.map((v, i) => (
                <div key={i} className="form-check">
                  <input
                      className="form-check-input"
                      type="checkbox"
                      checked={availability.includes(v)}
                      onChange={() => setAvailability(v)}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    {v}
                  </label>
                </div>
            ))}
          </div>
        </li>
        <li className="list-group-item">
          <h5 className="mt-1 mb-2">Price Range</h5>
          <div className="d-grid d-block mb-3">
            <div className="form-floating mb-2">
              <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
              />
              <label htmlFor="floatingInput">Min Price</label>
            </div>
            <div className="form-floating mb-2">
              <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
              />
              <label htmlFor="floatingInput">Max Price</label>
            </div>
            <button className="btn btn-dark" onClick={applyFilters}>Apply</button>
          </div>
        </li>
      </ul>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, lastPage: 1 });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(pagination.page, 9)
        .then((data) => {
          if (Array.isArray(data)) {
            setProducts(data);
            setFilteredProducts(data);
          } else if (data && Array.isArray(data.data)) {
            setProducts(data.data);
            setFilteredProducts(data.data);
            setPagination({ page: data.meta.page, lastPage: data.meta.lastPage });
          } else {
            console.error("Unexpected data format:", data);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
  }, [pagination.page]);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  function goToPage(page) {
    setPagination((prev) => ({ ...prev, page }));
  }

  function applyFilters() {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    const filtered = products.filter(product => {
      const priceMatch = product.price >= min && product.price <= max;
      const availabilityMatch = availability.length === 0 || (availability.includes("Disponible") && product.available) || (availability.includes("No disponible") && !product.available);
      return priceMatch && availabilityMatch;
    });
    setFilteredProducts(filtered);
  }

  function searchProductById() {
    fetchProductById(searchId)
        .then((data) => {
          if (data) {
            setFilteredProducts([data]);
          } else {
            console.error("Product not found");
          }
        })
        .catch((error) => console.error("Error fetching product:", error));
  }

  function handleProductClick(product) {
    navigate(`/products/${product.id}`, { state: { product } });
  }

  return (
      <div className="container mt-5 py-4 px-xl-5">
        <ScrollToTopOnMount />
        <nav aria-label="breadcrumb" className="bg-custom-light rounded">
          <ol className="breadcrumb p-3 mb-0">
            <li className="breadcrumb-item">
              <Link className="text-decoration-none link-secondary" to="/products" replace>
                All Products
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cases &amp; Covers
            </li>
          </ol>
        </nav>

        <div className="h-scroller d-block d-lg-none">
          <nav className="nav h-underline">
            {categories.map((v, i) => (
                <div key={i} className="h-link me-2">
                  <Link to="/products" className="btn btn-sm btn-outline-dark rounded-pill" replace>
                    {v}
                  </Link>
                </div>
            ))}
          </nav>
        </div>

        <div className="row mb-3 d-block d-lg-none">
          <div className="col-12">
            <div id="accordionFilter" className="accordion shadow-sm">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                      className="accordion-button fw-bold collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFilter"
                      aria-expanded="false"
                      aria-controls="collapseFilter"
                  >
                    Filter Products
                  </button>
                </h2>
              </div>
              <div id="collapseFilter" className="accordion-collapse collapse" data-bs-parent="#accordionFilter">
                <div className="accordion-body p-0">
                  <FilterMenuLeft
                      minPrice={minPrice}
                      setMinPrice={setMinPrice}
                      maxPrice={maxPrice}
                      setMaxPrice={setMaxPrice}
                      applyFilters={applyFilters}
                      availability={availability}
                      setAvailability={(value) => {
                        setAvailability((prev) => {
                          if (prev.includes(value)) {
                            return prev.filter((item) => item !== value);
                          } else {
                            return [...prev, value];
                          }
                        });
                      }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4 mt-lg-3">
          <div className="d-none d-lg-block col-lg-3">
            <div className="border rounded shadow-sm">
              <FilterMenuLeft
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  applyFilters={applyFilters}
                  availability={availability}
                  setAvailability={(value) => {
                    setAvailability((prev) => {
                      if (prev.includes(value)) {
                        return prev.filter((item) => item !== value);
                      } else {
                        return [...prev, value];
                      }
                    });
                  }}
              />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="d-flex flex-column h-100">
              <div className="row mb-3">
                <div className="col-lg-3 d-none d-lg-block">
                  <select className="form-select" aria-label="Default select example" defaultValue="">
                    <option value="">All Models</option>
                    <option value="1">iPhone X</option>
                    <option value="2">iPhone Xs</option>
                    <option value="3">iPhone 11</option>
                  </select>
                </div>
                <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                  <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search products by id"
                        aria-label="search input"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button className="btn btn-outline-dark" onClick={searchProductById}>
                      <FontAwesomeIcon icon={["fas", "search"]} />
                    </button>
                  </div>
                  <button className="btn btn-outline-dark ms-2 d-none d-lg-inline" onClick={changeViewType}>
                    <FontAwesomeIcon icon={["fas", viewType.grid ? "th-list" : "th-large"]} />
                  </button>
                </div>
              </div>
              <div
                  className={
                      "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                      (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                  }
              >
                {filteredProducts.map((product, i) => {
                  if (viewType.grid) {
                    return <Product key={i} product={product} onClick={() => handleProductClick(product)} />;
                  }
                  return <ProductH key={i} product={product} onClick={() => handleProductClick(product)} />;
                })}
              </div>
              <div className="d-flex align-items-center mt-auto">
                <span className="text-muted small d-none d-md-inline">Showing {filteredProducts.length} of {pagination.total}</span>
                <nav aria-label="Page navigation example" className="ms-auto">
                  <ul className="pagination my-0">
                    <li className={`page-item ${pagination.page === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => goToPage(pagination.page - 1)}>Previous</button>
                    </li>
                    {[...Array(pagination.lastPage)].map((_, i) => (
                        <li key={i} className={`page-item ${pagination.page === i + 1 ? "active" : ""}`}>
                          <button className="page-link" onClick={() => goToPage(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${pagination.page === pagination.lastPage ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => goToPage(pagination.page + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductList;