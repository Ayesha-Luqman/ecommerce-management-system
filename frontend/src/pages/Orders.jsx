import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("access");

        api.get(
            "my-orders/",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {

            setOrders(response.data);

        })
        .catch((error) => {
            // Handle error silently
        });

    }, []);

    return (

        <div className="container mt-5">

            <h2 className="mb-4 fw-bold">📦 My Orders</h2>

            {orders.length > 0 ? (

                orders.map((order) => (

                    <div
                        key={order.id}
                        className="order-card mb-4"
                    >

                        <div className="card-body">

                            <h5 className="fw-bold">Order #{order.id}</h5>

                            <p>
                                <strong>Status:</strong> {order.status}
                            </p>

                            <p>
                                <strong>Date:</strong>{new Date(order.order_date).toLocaleDateString()}
                            </p>

                            <div className="table-custom">
                                <table className="table mb-0">

                                    <thead className="table-light">

                                        <tr>

                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {order.items.map((item, index) => (

                                            <tr key={index}>

                                                <td>{item.product.name}</td>

                                                <td>
                                                    Rs. {item.price}
                                                </td>

                                                <td>
                                                    {item.quantity}
                                                </td>

                                                <td>
                                                    Rs. {item.subtotal}
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>
                            </div>

                            <h5 className="text-end mt-3 fw-bold">
                                Total: Rs. {order.total}
                            </h5>

                        </div>

                    </div>

                ))

            ) : (

                <h4 className="text-center py-4">No Orders Yet</h4>

            )}

        </div>

    );

}

export default Orders;