import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const HomeLayout = () => {

    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleNavToHome = () =>{
        navigate('/');
    }

    const [showMenu, setShowMenu] = useState(false);

    useEffect(()=>{
        window.addEventListener('resize',function(){
            setWindowWidth(window.innerWidth);
        })
    },[])

    useEffect(()=>{
        if(windowWidth>=670){
            setShowMenu(false);
        }
    },[windowWidth])

  return (
    <div className='home-layout-container'>
        {showMenu && <div className='menu-bar-container'>
                    <ul>
                        <li><NavLink onClick={(e)=>setShowMenu(false)} to="/">Home</NavLink></li>
                        <li><NavLink onClick={(e)=>setShowMenu(false)} to='/about'>About</NavLink></li>
                        <li><NavLink onClick={(e)=>setShowMenu(false)} to='/warehouses'>Warehouses</NavLink></li>
                        <li><NavLink onClick={(e)=>setShowMenu(false)} to='/contact'>Contact</NavLink></li>
                    </ul>
        </div>}
        <header>
            <nav className="navbar-container">
                <div className='logo' onClick={handleNavToHome}>Warehouse-Info</div>
                <ul className='menu-list'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                    <li><NavLink to='/warehouses'>Warehouses</NavLink></li>
                    <li><NavLink to='/contact'>Contact</NavLink></li>
                </ul>
                <i className='bx bx-menu hamburger' onClick={(e)=>setShowMenu(!showMenu)}></i>
            </nav>
        </header>
        <main>

            <Outlet/>
        </main>
        <footer><p>Copyright &copy;2023. Designed by Govarthan</p></footer>
    </div>
  )
}

export default HomeLayout