function Home() {

    return (

        <div className="container mt-5">

            <div className="hero-section text-white text-center p-6 py-5">

                <h1 className="display-4 fw-bold">
                    Welcome to Ecommerce Store
                </h1>

                <p className="lead mt-3">
                    Shop the latest products at the best prices.
                </p>

                <button
                    className="btn btn-light btn-lg mt-3"
                    onClick={() => window.location.href = "/products"}
                >
                    Shop Now →
                </button>

            </div>

            <div className="mt-5 text-center">

                <h2 className="fw-bold">Why Shop With Us?</h2>

                <div className="row mt-4 g-4">

                    <div className="col-md-4">

                        <div className="feature-card">

                            <h4>🚚 Fast Delivery</h4>

                            <p className="text-muted">
                                Get your products delivered quickly.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="feature-card">

                            <h4>💰 Best Prices</h4>

                            <p className="text-muted">
                                Affordable prices on all products.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="feature-card">

                            <h4>⭐ Quality Products</h4>

                            <p className="text-muted">
                                We provide trusted and quality products.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Home;