import React, { useState, useContext } from 'react'
import logo from '../image/Logo.png'
import user from '../image/user.jpg'
import Circle from '../image/Circle.png'
import Add from '../image/Add.png'
import Search from '../image/Search.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { Context } from '../context/Context'
import './nav.css';

function Nav() {
    const [showProfile, setShowProfile] = useState(false)
    const { setShowAddCard, setSearch, search } = useContext(Context)
    let email = localStorage.getItem('email')
    let navigate = useNavigate();

    const logout = () => {
        navigate(`/`)
    }

    return (
        <div className="nav">
            <div className="image">
                <img src={logo} alt="" />
            </div>
            <div className='last-nav'>
                <div className="search">
                    <input type="text" placeholder='What are you looking for?' onChange={(e) => setSearch(e.target.value)}/>
                    <img src={Search} alt="" />
                </div>
                    <div className="add">
                        <img src={Circle} alt="" />
                        <img src={Add} alt="" className='addIcon' />
                        <button className="add-item" onClick={() => setShowAddCard(true)}>
                            Add Item
                        </button>
                    </div>
                <div className="profile">
                    <button onClick={() => setShowProfile(!showProfile)}>
                        <img src={user} alt="" />
                    </button>
                    {
                        showProfile &&
                        <div className="profile-card">
                            <img src={user} alt="" />
                            <div>
                                <p>{email}</p>
                                <button className="logout" onClick={() => logout()}>
                                    Log Out
                                    <LogoutIcon sx={{ fontSize: 15, marginLeft: 1 }} />
                                </button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Nav