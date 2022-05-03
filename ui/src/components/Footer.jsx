import React from 'react'
import '../static/css/Footer.css';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faSpotify,
    faApple
  } from "@fortawesome/free-brands-svg-icons";


function Footer() {
    return (
        <div className="footer">
            <div className="container2">
                <div className="footer-row">
                    <div className="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><a href="#">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">affiliate program</a></li>
                        </ul>
                    </div>
                
                    <div className="footer-col">
                        <h4>follow us</h4>
                       

                        <div className='social-links'>
                        <a href="#"><FontAwesomeIcon icon={faSpotify} /></a> 
                        <a href="#"><FontAwesomeIcon icon={faApple} /></a> 
                        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a> 
                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a> 
                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a> 
                        <a href="#"><FontAwesomeIcon icon={faYoutube} /></a> 
                        </div>
                    </div>
        </div >
        </div>
        </div>
    )
}

export default Footer