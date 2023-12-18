const MenuGroup = ({ title, children }) => {
  return (
    <li className="flex flex-col font-semibold text-black text-2xl gap-4">
      {title}
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </li>
  );
};

export default MenuGroup;