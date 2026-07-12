import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ProductDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {

        api.get(`products/${id}/`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                // Handle error silently
            });

    }, [id]);


    const addToCart = () => {

    const token = localStorage.getItem("access");

    api.post(
        "add-to-cart/",
        {
            product_id: product.id,
            quantity: 1
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then((response) => {

        alert(response.data.message);

        navigate("/cart");

    })
    .catch((error) => {

        alert("Please login first.");

    });

};

    if (!product) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    return (

        <div className="container mt-5">

            <div className="row align-items-center">

                <div className="col-md-6">

                    <img
                        src={`http://127.0.0.1:8000${product.image}`}
                        alt={product.name}
                        className="img-fluid product-detail-img"
                    />

                </div>

                <div className="col-md-6">

                    <h2 className="fw-bold mb-3">
    {product.name}
</h2>

                    <h3 className="text-success fw-bold mb-3">
    Rs. {product.price}
</h3>
                    <p className="text-muted mb-4">
    {product.description}
</p>

                    <button
    className="btn btn-success-custom btn-lg"
    onClick={addToCart}
>
    🛒 Add to Cart
</button>
                </div>

            </div>

        </div>

    );

}

export default ProductDetail;