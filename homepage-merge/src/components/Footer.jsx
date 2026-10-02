function Footer() {
    return (
        <footer className="site-footer">

            <div className="footer-columns">

                <div className="footer-col">
                    <h3>Discover</h3>
                    <p>Explore Closis and learn how it helps you find outfits that fit our style, wardrobe, and day.</p>
                </div>

                <div className="footer-col">
                    <h3>Join Us</h3>
                    <p>Create your Closis account and start building your digital wardrobe.</p>
                </div>

                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <p>
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                    <p>
                        Email: closis@example.com
                    </p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} Your Closis
                </p>
            </div>

        </footer>
    );
}

export default Footer;