function Footer() {
    return (
        <footer className="site-footer">

            <div className="footer-columns">

                <div className="footer-col">
                    <h3>Discover</h3>
                    <p>Write your discover</p>
                </div>

                <div className="footer-col">
                    <h3>Join Us</h3>
                    <p>Additional information</p>
                </div>

                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <p>Contact us for more information</p>
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