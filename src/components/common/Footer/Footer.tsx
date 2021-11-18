import React from 'react';
import './Footer.scss';

import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import {
  TiSocialFacebookCircular,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialSkype,
} from 'react-icons/ti';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <Link to="./">
            <Image src="./logo.png"></Image>
          </Link>
        </div>
        <div className="footer__contact">
          <address className="footer__contact--left">
            <p>Phone: 0123.456.789</p>
            <p>Fax: 0123.456.789</p>
          </address>
          <address className="footer__contact--right">
            <p>TP.HCM, Viet Nam</p>
            <p>TP Thu Duc</p>
          </address>
        </div>
        <div className="footer__social">
          <div className="footer__social--content">
            <div className="footer__social--item">
              <TiSocialFacebookCircular size={56}></TiSocialFacebookCircular>
            </div>
            <div className="footer__social--item">
              <TiSocialTwitter size={56}></TiSocialTwitter>
            </div>
            <div className="footer__social--item">
              <TiSocialYoutube size={56}></TiSocialYoutube>
            </div>
            <div className="footer__social--item">
              <TiSocialSkype size={56}></TiSocialSkype>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
