import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog, faCross, faMobileButton, faMultiply, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [open, setOpen] = useState(false);

    const fakeHandler =() =>{
        alert('These are for demo only');
    }

    return (
        <div className='navbar-container'>
            <nav className='navbar'>
                <div className='btn-ham' onClick={(e)=> setOpen(!open)}>
                    <FontAwesomeIcon icon={faBars} style={{ height: '25px' }} />
                </div>
            </nav>
            <div className={`sidebar ${open ? 'active' : ''}`}>
                <div className='header'>
                    <img src='https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' alt='' />
                    <p>Aditya Rana</p>
                    <div className='btn-cross' onClick={(e)=>setOpen(!open)}>
                        <FontAwesomeIcon icon={faMultiply} style={{ height: '25px' }} />
                    </div>
                </div>
                <div className='side-body'>
                    <div><Link to='/'>Home</Link></div>
                    <div><Link to='/pie'>Sector</Link></div>
                    <div><Link to='/other'>Region</Link></div>
                    {/* <div className='disable'><Link to='/'></Link></div>
                    <div className='disable'><Link to='/'>Home</Link></div> */}
                </div>
                <div className='foot-side'>
                    <button className='l' onClick={fakeHandler}><FontAwesomeIcon icon={faCog} /> Settings</button>
                    <button className='r' onClick={fakeHandler}><FontAwesomeIcon icon={faPowerOff} /> Logout</button>
                </div>
            </div>
            <div className={`overlay ${open ? 'active' : ''}`} onClick={(e)=> setOpen(!open)}></div>
        </div>
    )
}

export default Navbar;

