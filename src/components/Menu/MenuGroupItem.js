const MenuGroupItem = ({ href, children }) => {
  return (
    <a href={href} className="text-base">
      {children}
    </a>
  );
};

export default MenuGroupItem;