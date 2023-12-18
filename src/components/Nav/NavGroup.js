const NavGroup = ({ title, children }) => {
  return (
    <li className="group flex items-center justify-center relative h-full cursor-pointer text-black font-semibold text-lg hover:text-red transition-colors duration-300">
      {title}
      <div className="absolute top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto rounded-lg bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-900 to-yellow-300 drop-shadow-md">
        <div className="m-1.5 px-4 py-2 bg-beige/95 rounded-lg flex flex-col gap-2">
          {children}
        </div>
      </div>
    </li>
  );
};

export default NavGroup;