import user_icon from "@assets/user_icon.png";

const LoginIcon = () => {
  return (
    <div>
      <img
        src={user_icon}
        className="mb-4 w-14 h-14 sm:w-16 sm:h-16 sm:mb-0"
        alt="user-icon"
      />
    </div>
  );
};

export default LoginIcon;
