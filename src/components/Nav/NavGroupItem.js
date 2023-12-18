const NavGroupItem = ({ href, children }) => {
  return (
    <a href={href} className="text-black whitespace-nowrap text-base font-semibold hover:text-red transition-colors duration-300">
      {children}
    </a>
  );
};

export default NavGroupItem;