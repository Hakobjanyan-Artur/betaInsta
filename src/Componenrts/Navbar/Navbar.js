import React, { useRef } from "react";
import './Navbar.css'
import { NavLink } from "react-router-dom";
import InstaLogo from "../../logo/InstaLogo";
import { CiSearch, CiLogout } from "react-icons/ci";
import { ImHome } from "react-icons/im";
import { BsMessenger } from "react-icons/bs";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, toggleSearch } from "../../store/slices/search/searchSlice";
import { logout } from "../../store/slices/users/usersSlice";
function Navbar() {
    const searchTxt = useSelector(selectSearch)
    const dispatch = useDispatch()
    const search = useRef(null)
    const links = useRef(null)
    const logo = useRef(null)
    const hiden = useRef(null)
    return (
        <div className="nav">
            <div className="container">
               <div ref={logo} className="logo"><InstaLogo /></div>
               <div className="hiden" ref={hiden} onClick={() => {
                    search.current.classList.toggle('abs')
                    links.current.classList.toggle('none')
                    logo.current.classList.toggle('none')
                    hiden.current.classList.toggle('none')
               }}>< CiSearch /></div>
                    <div ref={search}  className="search">
                        <input
                        value={searchTxt}
                        onChange={(e) => dispatch(toggleSearch(e.target.value))} 
                        type="text"
                        placeholder="Search user"
                        />
                        <span onClick={() => {
                            search.current.classList.toggle('abs')
                            links.current.classList.toggle('none')
                            logo.current.classList.toggle('none')
                            hiden.current.classList.toggle('none')
                        }}>< CiSearch /></span>
                    </div>
                <div ref={links} className="links">
                <div ref={links} className="home" title='Home'><NavLink className={({isActive}) => isActive ? 'click' : 'content'} to={'/home'} end ><ImHome /></NavLink></div>
                <div ref={links} className="mess" title="Messenger"><NavLink className={({isActive}) => isActive ? 'click' : 'content'} to={'mess'} ><BsMessenger /></NavLink></div> 
                <div ref={links} className="addfile" title="Add new post"><NavLink className={({isActive}) => isActive ? 'click' : 'content'} to={'posts'} ><MdOutlineLibraryAdd /></NavLink></div> 
                <div ref={links} className="user" title="User page"><NavLink className={({isActive}) => isActive ? 'click' : 'content'} to={'user'} ><AiOutlineUser /></NavLink></div> 
                <div onClick={() => dispatch(logout())} ref={links} className="user" title="Logout"><NavLink className={({isActive}) => isActive ? 'click' : 'content'} to={'/'} ><CiLogout /></NavLink></div> 
                </div>        
            </div>
        </div>
    )
}

export default Navbar