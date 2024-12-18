import LoginIcon from "./_utils/LoginIcon";
import LoginForm from "./_utils/LoginForm";
const Login = () => {
  return (
    <div className="flex items-start w-full h-full">
      <div className="hidden h-screen sm:flex sm:justify-center sm:w-1/2 bg-secondary"></div>
      <div className="flex w-full h-screen sm:w-1/2">
        <div className="flex flex-col items-center justify-center w-full gap-4 space-y-4 sm:w-11/12 sm:gap-6 md:gap-8 sm:space-y-6">
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
