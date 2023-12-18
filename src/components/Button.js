const Button = ({ href, children }) => {
  return (
    <a
      href={href}
      className="flex items-center justify-center px-5 py-2 rounded-xl bg-red hover:bg-maroon transition-colors duration-300 text-white font-semibold"
    >
      {children}
    </a>
  );
};

export default Button;