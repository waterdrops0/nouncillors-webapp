import React, { useState } from 'react';
import MenuGroup from './MenuGroup';
import MenuGroupItem from './MenuGroupItem';

const Menu = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <img
        src="/icons/menu.svg"
        alt="Menu icon"
        className="w-8 hidden max-lg:flex"
        onClick={openMenu}
      />

      <div
        id="menu"
        className={`fixed top-0 left-0 w-full h-full ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} backdrop-blur-xl z-50`}
      >
        <img
          src="/icons/close.svg"
          alt="Close icon"
          className="absolute top-8 right-8 w-6"
          onClick={closeMenu}
        />
        <ul className="flex flex-col h-full items-center justify-evenly">
          {navigation.map((group, index) => (
            <MenuGroup key={index} title={group.title}>
              {group.items.map((item, itemIndex) => (
                <MenuGroupItem key={itemIndex} href={item.href}>
                  {item.name}
                </MenuGroupItem>
              ))}
            </MenuGroup>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Menu;