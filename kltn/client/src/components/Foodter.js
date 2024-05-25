import React from 'react';

const Footer = () => {
    return (
        <footer className="footer-dark main-footer overflow-hidden position-relative pt-5">
            
            <div className="container border-top">
                <div className="align-items-center g-3 py-4 row">
                    <div className="col-lg-auto">
                        {/* start footer nav */}
                        <ul className="list-unstyled list-separator mb-2 footer-nav">
                            <li className="list-inline-item"><a href="/">Privacy</a></li>
                            <li className="list-inline-item"><a href="/">Sitemap</a></li>
                            <li className="list-inline-item"><a href="/">Cookies</a></li>
                        </ul>
                        {/* end /. footer nav */}
                    </div>
                    <div className="col-lg order-md-first">
                        <div className="align-items-center row">
                            {/* start footer logo */}
                            <a href="index.html" className="col-sm-auto footer-logo mb-2 mb-sm-0">
                                <img src="/assets/images/logo-white.png" alt="" />
                            </a>
                            {/* end /. footer logo */}
                            {/* start text */}
                            <div className="col-sm-auto copy">© 2022 ListOn - All Rights Reserved- All Rights Reserved</div>
                            {/* end /. text */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
