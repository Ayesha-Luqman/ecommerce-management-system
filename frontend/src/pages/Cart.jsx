import { useEffect, useState } from "react";
import api from "../services/api";

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

    const token = localStorage.getItem("access");

    api.get(
        "view-cart/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    .then((response) => {

        setCartItems(response.data);

    })
    .catch((error) => {
        // Handle error silently
    });

}, []);

    const updateQuantity = async (productId, quantity) => {

    const token = localStorage.getItem("access");

    try {

        await api.put(
            "update-cart/",
            {
                product_id: productId,
                quantity: quantity
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        window.location.reload();

    } catch (error) {

        alert("Unable to update cart.");

    }

};


const removeItem = async (productId) => {

    const token = localStorage.getItem("access");

    try {

        await api.post(
    "remove-cart/",
    {
        product_id: productId
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

        alert("Product Removed Successfully");

        window.location.reload();

    } catch (error) {

    alert(JSON.stringify(error.response?.data));

}
};

const placeOrder = async () => {

    const token = localStorage.getItem("access");

    try {

        const response = await api.post(
            "place-order/",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert(response.data.message);

        window.location.href = "/orders";

    } catch (error) {

    alert(JSON.stringify(error.response?.data));

}
};

    return (

        <div className="container mt-5">

            <h2 className="mb-4 fw-bold">🛒 My Cart</h2>

            <div className="table-custom">
                <table className="table table-bordered mb-0">

                    <thead className="table-light">

                        <tr>
                           <th>Product</th>
                           <th>Price</th>
                           <th>Quantity</th>
                           <th>Subtotal</th>
                           <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {cartItems.length > 0 ? (

                            cartItems.map((item) => (

                                <tr key={item.id}>

                                    <td>
    {item.product.name} (ID: {String(item.product.id)})
</td>

                                    <td>Rs. {item.product.price}</td>

                                    <td>

    <button
        className="btn btn-sm btn-danger me-2"
        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
    >
        -
    </button>

    <span className="fw-bold mx-2">{item.quantity}</span>

    <button
        className="btn btn-sm btn-success ms-2"
        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
    >
        +
    </button>

</td>

                                    <td className="fw-bold">Rs. {item.subtotal}</td>

                                    <td>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => removeItem(item.product.id)}
    >
        Remove
    </button>

</td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    Your cart is empty.
                                </td>
                            </tr>

                        )}
                      
                    </tbody>
                </table>
            </div>

              <div className="d-flex justify-content-end mt-4">

    <button
        className="btn btn-success-custom btn-lg"
        onClick={placeOrder}
    >
        Place Order
    </button>

</div>
        </div>
        

    );

}

export default Cart;