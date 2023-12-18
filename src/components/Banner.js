const Banner = () => {
  return (
    <a
      href="https://form.addressform.io/f/nouncil-apply-for-membership"
      draggable={false}
      className="banner-fullwidth bg-red hover:bg-maroon transition-colors duration-300 text-white flex gap-2 items-center justify-center p-2 font-semibold"
    >
      Apply for a membership
      <img src="/icons/arrow.svg" alt="An arrow pointing right" />
    </a>
  );
};

export default Banner;