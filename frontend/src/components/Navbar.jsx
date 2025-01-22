import { useState } from 'react';




const Navbar = () => {
    const [ darkMode, setDarkMode] = useState(false);


    const toggleDarkMode = () => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
    };


    return (
       <nav className="navbar p-4 flex justify-between items-center">
        <div className="logo">Logo</div>
        <button onClick={toggleDarkMode} className='btn'>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
       </nav>
         
    )
}

   return (
<nav className="navbar bg-blue-500 p-4 flex justify-between items-center">
<div className="logo text-white">Logo</div>
<div className="menu text-white">Menú</div>
</nav> 

   )



  


  export default Navbar;

  