import bg_image from "@assets/bg.png";

const LoginImage = () => {
  return (
    <div className="hidden h-screen sm:flex sm:justify-center sm:w-1/2 bg-secondary">
    <img
      src={bg_image}
      className="hidden w-auto sm:block"
      alt="Background"
    />
  </div>
  )
}

export default LoginImage