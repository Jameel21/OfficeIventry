
import RegisterForm from "./_utils/RegisterForm";

const Register = () => {
  return (
    <div className="flex w-full h-full bg-primary">
      <div className="flex flex-col items-center justify-center w-full gap-4 px-4 py-10 space-y-4 sm:px-6 md:px-10 sm:gap-6 md:gap-8 sm:py-0 sm:space-y-6">
        <div className="w-full md:w-3/4 lg:w-1/2">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
export default Register;
