import user_icon from "@assets/user.png";
import logout from "@assets/logout1.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getDecodedData } from "@/utils/encryptDecrypt";

const User = () => {
  const navigate = useNavigate()
  const user = getDecodedData("userName")
  const role = getDecodedData("userRole")
  const userId = getDecodedData("userId");

  const handleProfile = () => {
    navigate(`/viewProfile/${userId}`)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    toast.success("You have been logged out");
    navigate("/auth/login");
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-6 mt-3 md:justify-between sm:gap-10 text-primary">
        <div onClick={handleProfile}>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user_icon}/>
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <div className="">
            <h1 className="text-base sm:text-lg text-slate-200">{user}</h1>
            <p className="text-sm text-slate-400">{role}</p>
        </div>
         <div onClick={handleLogout}>
          <Avatar className="cursor-pointer">
            <AvatarImage src={logout} className="text-white"/>
          </Avatar>
        </div>
      </div>
      <div className="mt-3 bg-white h-hl"></div>
    </div>
  );
};

export default User;
