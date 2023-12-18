const Delegated = () => {
  const delegated = [68, 131, 232, 237, 239, 364, 469];

  return (
    <a
      href="https://nouns.wtf/delegate?to=0xcC2688350d29623E2A0844Cc8885F9050F0f6Ed5"
      className="flex items-center gap-2 font-semibold text-black text-lg pr-5"
    >
      <div
        className="flex items-center relative"
        style={{ width: `${delegated.length * 21}px` }}
      >
        {delegated.map((noun, index) => (
          <img
            key={noun} // Adding a key for React list rendering
            src={`https://api.cloudnouns.com/v2/nouns/${noun}`}
            alt={`Noun ${noun}`}
            className="absolute rounded-full w-12 h-12 border-4 border-beige select-none"
            style={{ left: `${index * 16}px` }}
            draggable={false}
          />
        ))}
      </div>
      {delegated.length} Delegated
    </a>
  );
};

export default Delegated;