import LoginImage from "./_utils/LoginImage";
import LoginIcon from "./_utils/LoginIcon";
import LoginForm from "./_utils/LoginForm";
const Login = () => {
  return (
    <div className="flex items-start w-full h-full">
      <LoginImage />
      <div className="flex w-full h-screen sm:w-1/2 bg-primary">
        <div className="flex flex-col items-center justify-center w-11/12 gap-4 px-4 py-10 space-y-4 sm:px-6 md:px-10 sm:gap-6 md:gap-8 sm:py-0 sm:space-y-6">
          <LoginIcon />
          <div>
            <LoginForm />
          </div>
        </div>
        <div className="hidden w-1/12 sm:block bg-secondary"></div>
      </div>
    </div>
  );
};
export default Login;
