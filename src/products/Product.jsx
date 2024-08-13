import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../nillkin-case-1.jpg";
import { useCart } from "../context/CartContext";

function Product({ product }) {
    const { name, price, percentOff } = product;
    const { addToCart } = useCart();
    let offPrice = `${price} USD`;
    let discountBadge = null;

    if (percentOff && percentOff > 0) {
        discountBadge = (
            <div
                className="badge bg-dim py-2 text-white position-absolute"
                style={{ top: "0.5rem", right: "0.5rem" }}
            >
                {percentOff}% OFF
            </div>
        );

        offPrice = (
            <>
                <del>{price}Ks</del> {price - (percentOff * price) / 100}Ks
            </>
        );
    }

    return (
        <div className="col">
            <div className="card shadow-sm">
                <Link to={`/products/${product.id}`} replace>
                    {discountBadge}
                    <img
                        className="card-img-top bg-dark cover"
                        height="200"
                        alt={name}
                        src={image}
                    />
                </Link>
                <div className="card-body">
                    <h5 className="card-title text-center text-dark text-truncate">
                        {name}
                    </h5>
                    <p className="card-text text-center text-muted mb-0">{offPrice}</p>
                    <div className="d-grid d-block">
                        <button className="btn btn-outline-dark mt-3" onClick={() => addToCart(product)}>
                            <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;