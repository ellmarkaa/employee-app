import {Oval} from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      visible={true}
      height="60"
      width="60"
      color="#4fa94d"
      ariaLabel="oval-loading"
    />
  );
};

export default Loader;