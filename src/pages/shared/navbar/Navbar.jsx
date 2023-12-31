import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { BsCart4 } from 'react-icons/bs';
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
    const { user, loginOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    // logOut here
    const handleLogout = () => {
        loginOut()
            .then()
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/menu'}>Our Menu</Link></li>
        <li><Link to={'/order/salad'}>Order Food</Link></li>
        <li><Link to={'/secret'}>Secret</Link></li>

        {
            user && isAdmin && <li><Link to={'/dashboard/adminHome'}>Admin Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to={'/dashboard/userHome'}>User Dashboard</Link></li>
        }


        <li><Link to='/dashboard/cart'>
            <button className="btn">
                <BsCart4 className=" text-xl"/>
                <div className="badge badge-secondary">+{cart?.length}</div>
            </button>
        </Link></li>
        
        {
            user ? <>
                <button onClick={handleLogout} className="">LogOut</button>
            </> : <>
                <li><Link to={'/login'}>Login</Link></li>
            </>
        }
    </>
    return (
        <div className="navbar fixed z-10 max-w-screen-xl mx-auto text-white bg-[#15151580]">
            <div className="navbar-start ">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                   {navOptions}
                </ul>
                </div>
                <a className=" normal-case text-xl">BistroBoss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;