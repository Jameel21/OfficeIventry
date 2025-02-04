import user_icon from "@assets/user.png";
import logout from "@assets/logout1.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getDecodedData } from "@/utils/encryptDecrypt";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { useState } from "react";

const User = () => {
  const navigate = useNavigate()
  const userData = getDecodedData("userData");
  const user = userData?.userName;
  const role = userData?.userRole;
  const userId = userData?.userId;

  const [showModal, setShowModal] = useState(false);

  const handleProfile = () => {
    navigate(`/viewProfile/${userId}`)
  }

  const handleLogout = () => {
    localStorage.removeItem("userData");
    toast.success("You have been logged out");
    navigate("/auth/login");
  }

  const handleLogoutClick = () => {
    setShowModal(true); 
  };

  const confirmLogout = () => {
    handleLogout();
    setShowModal(false); 
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2 mt-3 sm:gap-3 text-primary">
        <div onClick={handleProfile}>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user_icon}/>
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <div className="">
            <h1 className="text-sm sm:text-lg text-slate-200">{user}</h1>
            <p className="text-sm text-slate-400">{role}</p>
        </div>
         <div onClick={handleLogoutClick}>
          <Avatar className="cursor-pointer">
            <AvatarImage src={logout} className="text-white"/>
          </Avatar>
        </div>
      </div>
      <div className="mt-3 bg-white h-hl"></div>

        {/* Confirmation Modal */}
        <ConfirmationModal
        showModal={showModal}
        title={"Are you sure you want to log out ?"}
        onClose={() => setShowModal(false)} 
        onConfirm={confirmLogout} 
       
      />
    </div>
  );
};

export default User;
