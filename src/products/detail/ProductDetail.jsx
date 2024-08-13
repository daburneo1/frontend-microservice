import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Image from "../../nillkin-case-1.jpg";
import Ratings from "react-ratings-declarative";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount.jsx";
import { fetchProductById, updateProductById, deleteProductById } from "../../hooks/useProducts.js";
import {useCart} from "../../context/CartContext.jsx";

function ProductDetail() {
  const { addToCart } = useCart();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    status: "",
  });

  useEffect(() => {
    fetchProductById(location.pathname.split("/").pop())
        .then((data) => {
          if (data) {
            setProduct(data);
            setEditForm(data);
          } else {
            console.error("Product not found");
          }
        })
        .catch((error) => console.error("Error fetching product:", error));
  }, [location.pathname]);

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
  };

  const handleDeleteProduct = () => {
    deleteProductById(location.pathname.split("/").pop())
        .then(() => {
          console.log('Product deleted successfully');
          // Redirect or update UI after successful deletion
        })
        .catch((error) => console.error('Error deleting product:', error))
        .finally(() => setIsDeletePopupOpen(false));
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    updateProductById(location.pathname.split("/").pop(), editForm)
        .then(() => {
          console.log('Product updated successfully');
          setIsEditPopupOpen(false);
        })
        .catch((error) => console.error('Error updating product:', error));
  };

  const handleCancelEdit = () => {
    setIsEditPopupOpen(false);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, percentOff, category, rating } = product;
  let offPrice = `${price} USD`;
  let percentOffBadge = null;

  if (percentOff && percentOff > 0) {
    percentOffBadge = (
        <div
            className="badge bg-dim py-2 text-white position-absolute"
            style={{ top: "0.5rem", right: "0.5rem" }}
        >
          {percentOff}% OFF
        </div>
    );

    offPrice = (
        <>
          <del>{price} Ks</del> {price - (percentOff * price) / 100} Ks
        </>
    );
  }

  return (
      <div className="container mt-5 py-4 px-xl-5">
        <ScrollToTopOnMount />
        <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
          <ol className="breadcrumb p-3">
            <li className="breadcrumb-item">
              <Link className="text-decoration-none link-secondary" to="/products">
                All Products
              </Link>
            </li>
            <li className="breadcrumb-item">
              <a className="text-decoration-none link-secondary" href="!#">
                {category}
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>
        <div className="row mb-4">
          <div className="d-none d-lg-block col-lg-1">
            <div className="image-vertical-scroller">
              <div className="d-flex flex-column">
                {Array.from({ length: 10 }, (_, i) => {
                  let selected = i !== 1 ? "opacity-6" : "";
                  return (
                      <img
                          key={i}
                          className={`border rounded mb-2 ${selected}`}
                          alt=""
                          src={Image}
                      />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12 mb-4">
                <img
                    className="border rounded ratio ratio-1x1"
                    alt=""
                    src={Image}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="d-flex flex-column h-100">
              <h2 className="mb-1">{name}</h2>
              <h4 className="text-muted mb-4">{offPrice}</h4>

              <div className="row g-3 mb-4">
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100" onClick={() => addToCart(product)}>
                    Agregar al carrito
                  </button>
                </div>
                <div className="col">
                  <button className="btn btn-dark py-2 w-100">Comprar ahora</button>
                </div>
              </div>

              <button className="btn btn-primary mb-4" onClick={handleEditClick}>
                Editar
              </button>

              <button className="btn btn-danger mb-4" onClick={handleDeleteClick}>
                Eliminar
              </button>

              <h4 className="mb-0">Details</h4>
              <hr/>
              <dl className="row">
                <dt className="col-sm-4">Code</dt>
                <dd className="col-sm-8 mb-3">{product.id}</dd>

                <dt className="col-sm-4">State</dt>
                <dd className="col-sm-8 mb-3">{product.available === true ? "Available" : "Not available"}</dd>

                <dt className="col-sm-4">Created Date</dt>
                <dd className="col-sm-8 mb-3">{product.createdAt}</dd>

                <dt className="col-sm-4">Updated Date</dt>
                <dd className="col-sm-8 mb-3">{product.updatedAt}</dd>

                <dt className="col-sm-4">Rating</dt>
                <dd className="col-sm-8 mb-3">
                  <Ratings
                      rating={rating}
                      widgetRatedColors="blue"
                  >
                    <Ratings.Widget/>
                    <Ratings.Widget/>
                    <Ratings.Widget/>
                    <Ratings.Widget/>
                  </Ratings>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {isEditPopupOpen && (
            <div className="modal" style={{display: "block"}}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Editar Producto</h5>
                    <button type="button" className="btn-close" onClick={handleCancelEdit}></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleEditFormSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditFormChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="price" className="form-label">Precio</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={editForm.price}
                            onChange={handleEditFormChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="status" className="form-label">Estado</label>
                        <select
                            className="form-control"
                            id="status"
                            name="status"
                            value={editForm.status}
                            onChange={handleEditFormChange}
                        >
                          <option value="disponible">Disponible</option>
                          <option value="no disponible">No disponible</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary">Aceptar</button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancelar</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        )}
        {isDeletePopupOpen && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirmar Eliminación</h5>
                    <button type="button" className="btn-close" onClick={handleCancelDelete}></button>
                  </div>
                  <div className="modal-body">
                    <p>¿Estás seguro de que deseas eliminar este producto?</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancelar</button>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteProduct}>Aceptar</button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default ProductDetail;