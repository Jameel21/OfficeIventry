import { Bars } from "react-loader-spinner";

const LoadSpinner = () => {
  return (
    <Bars
    height="30"
    width="30"
    color="#483528"
    ariaLabel="bars-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  )
}

export default LoadSpinner