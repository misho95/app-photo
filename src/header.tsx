import { animated, useSpring } from "@react-spring/web";

interface PropsType {
  props: {
    resetPage: () => void;
    handleChangeQuery: (arg: string) => void;
    query: string;
  };
}

const Header = ({ props }: PropsType) => {
  const { resetPage, handleChangeQuery, query } = props;

  const animateHeader = useSpring({
    from: { y: -100 },
    to: { y: 0 },
    duration: 100,
    config: {
      mass: 1,
      friction: 20,
      tension: 60,
    },
  });

  return (
    <animated.header
      style={{ ...animateHeader }}
      className="p-[20px] mb-[10px] flex justify-between items-center gap-[10px]"
    >
      <h3
        onClick={resetPage}
        className="text-[20px] sm:text-[35px] select-none cursor-pointer w-fit text-center font-mono"
      >
        PEXEL GALLERY
      </h3>

      <label className="w-1/2">
        <input
          type="text"
          placeholder="search..."
          value={query}
          onChange={(e) => {
            handleChangeQuery(e.target.value);
          }}
          className="w-full h-[30px] sm:h-[40px] rounded-2xl p-[10px] bg-neutral-800 text-white opacity-90 focus:outline-none focus:opacity-100 sm:scale-95 sm:focus:scale-100 duration-200"
        />
      </label>
    </animated.header>
  );
};

export default Header;
