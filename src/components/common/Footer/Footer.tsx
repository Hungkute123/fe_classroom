import React from 'react';
import { Image } from 'react-bootstrap';
import { SiGithub, SiGoogle } from 'react-icons/si';
import {
  TiSocialFacebookCircular, TiSocialYoutube
} from 'react-icons/ti';
import { Link } from 'react-router-dom';
import './Footer.scss';


export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo">
        <Link to="/" title="Trang chủ">
          <Image src="/assets/profile.jpg"></Image>
        </Link>
      </div>
      <ul className="footer__contact">
        <li>
          <Link to="/" title="Giới thiệu">Giới thiệu</Link>
        </li>
        <li>
          <Link to="/" title="Hợp tác">Hợp tác</Link>
        </li>
        <li>
          <Link to="/" title="Liên hệ">Liên hệ</Link>
        </li>
      </ul>
      <ul className="footer__social">
        <li>
          <Link to="/" title="facebook">
            <TiSocialFacebookCircular size={40}></TiSocialFacebookCircular>
          </Link>
        </li>
        <li>
          <Link to="/" title="github">
            <SiGithub size={30}></SiGithub>
          </Link>
        </li>
        <li>
          <Link to="/" title="youtube">
            <TiSocialYoutube size={30}></TiSocialYoutube>
          </Link>
        </li>
        <li>
          <Link to="/" title="google">
            <SiGoogle size={30}></SiGoogle>
          </Link>
        </li>
      </ul>
    </div>
  );
};
