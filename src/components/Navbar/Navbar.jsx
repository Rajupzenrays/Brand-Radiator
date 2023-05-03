import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarStyles.css";
import Logo from '../../Images/BR-logo.png'
import {FaBars} from 'react-icons/fa'
import {RxCross2} from 'react-icons/rx'

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [selectedLink, setSelectedLink] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsScrolling(scrollTop > 0);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav className={isScrolling ? "scrolling-nav" : ""}>
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>

        <div>
          <ul
            id="navbar"
            className={clicked ? "active" : ""}
          >
            <li>
              <Link to="/" className={selectedLink === 'home' ? 'active' : ''} onClick={() => setSelectedLink('home')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={selectedLink === 'about' ? 'active' : ''} onClick={() => setSelectedLink('about')}>About</Link>
            </li>
            <li>
              <Link to="/contact" className={selectedLink === 'contact' ? 'active' : ''} onClick={() => setSelectedLink('contact')}>Contact Us</Link>
            </li>
            <li>
              {/* {console.log((localStorage.getItem('isLoggedIn')))} */}
              <Link to={localStorage.getItem('isLoggedIn') == true ? "/admin" : "/dashboard"} className={selectedLink === 'admin' ? 'active' : ''} onClick={() => setSelectedLink('admin')}>Admin</Link>
            </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleClick}>
          <span
            style={{color:'#fff'}}
            id="bar"
            className=""
          >{clicked ? <RxCross2 size={'2rem'}/> : <FaBars size={'2rem'}/>}</span>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
