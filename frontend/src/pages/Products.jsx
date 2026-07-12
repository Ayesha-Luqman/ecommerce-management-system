import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {

    api.get(`products/?search=${search}&category=${category}`)
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
                // Handle error silently
            });

}, [search, category]);

useEffect(() => {

    api.get("categories/")
        .then((response) => {

            setCategories(response.data);

        })
        .catch((error) => {
            // Handle error silently
        });

}, []);

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Products
            </h2>

            <div className="row mb-4">

    <div className="col-md-6">

        <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

    </div>

    <div className="col-md-4">

        <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >

            <option value="">All Categories</option>

            {categories.map((cat) => (

                <option
                    key={cat.id}
                    value={cat.name}
                >
                    {cat.name}
                </option>

            ))}

        </select>

    </div>

</div>

            <div className="row">

                {products.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </div>
    );
}

export default Products;

   