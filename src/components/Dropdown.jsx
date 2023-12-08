import React, { useState } from 'react'; 

export function DropdownItem({children, onClick}) { 
  return (
    <li onClick={onClick} className="Dropdown__item">{children}</li> 
)}

export function Dropdown({children, title}) {
    const [isOpen, setIsOpen] = useState(false);
    return ( 
    <div className="Dropdown">
        <p className="Dropdown__title" onClick={() => setIsOpen(!isOpen)}>{title}</p>
        <ul className="Dropdown__list " style={{display: isOpen ? 'block' : 'none'}}  >
            {children}
        </ul>
    </div>     
)}