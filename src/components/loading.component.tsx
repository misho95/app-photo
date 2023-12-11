import Load from "../assets/loading.svg";

const LoadingComponent = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center">
      <img src={Load} className="w-[100px]" />
    </div>
  );
};

export default LoadingComponent;
