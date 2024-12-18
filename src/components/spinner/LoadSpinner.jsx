import { Bars } from "react-loader-spinner";

const LoadSpinner = () => {
  return (
    <Bars
    height="30"
    width="30"
    color="#0C3A6E"
    ariaLabel="bars-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  )
}

export default LoadSpinner