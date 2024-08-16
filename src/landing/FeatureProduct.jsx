import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";

function FeatureProduct({ product }) {
  return (
      <div className="col">
        <div className="card shadow-sm">
          <img
              className="card-img-top bg-dark cover"
              height="240"
              alt={product.name}
              src={Image || "default-image-path.jpg"} // Usa una imagen por defecto si no hay imagen
          />
          <div className="card-body">
            <h5 className="card-title text-center">{product.name}</h5>
            <p className="card-text text-center text-muted">{product.price} USD</p>
            <div className="d-grid gap-2">
              <Link to={`/products/${product.id}`} className="btn btn-outline-dark" replace>
                Detalle
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default FeatureProduct;