import { Link } from "react-router-dom";

function ProductCard({ product }) {

    return (

        <div className="col-md-4 mb-4">

            <div className="product-card h-100">

                <img
                    src={`http://127.0.0.1:8000${product.image}`}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                        height: "250px",
                        objectFit: "cover"
                    }}
                />

                <div className="card-body d-flex flex-column">

                    <h5 className="card-title fw-bold">
                        {product.name}
                    </h5>

                    <p className="text-success fs-5 fw-bold">
                        Rs. {product.price}
                    </p>

                    <div className="mt-auto">

                        <Link
                            to={`/products/${product.id}`}
                            className="btn btn-primary-custom w-100"
                        >
                            View Details
                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ProductCard;