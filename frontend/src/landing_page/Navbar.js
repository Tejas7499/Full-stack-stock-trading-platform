import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return ( 
        <nav class="navbar navbar-expand-lg border-bottom" style={{backgroundColor:"#fff"}}>
            <div class="container">
                <Link class="nav-link active" to="/"> <img src='media/images/logo.svg' alt='logo' style={{width:"25%"}}/> </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    
                </div>
                <form class="d-flex" role="search">
                    <ul class="navbar-nav mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" to="/signup">Signup</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/about">About</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/products">Products</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/pricing">Pricing</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" to="/support">Support</Link>
                        </li>
                    </ul>        
                </form>
            </div>
        </nav>
    );
}

export default Navbar;