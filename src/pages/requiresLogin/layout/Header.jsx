import logo from "../../../Img/logo-close.png";
import Avatar from "../../../components/Avatar";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate(); 
  function handleProfileNavigation() {
    navigate("/profile"); 
  }

  return (
    <header className="flex justify-between h-28 items-center mb-4">
      <div className="ml-2 sm:ml-7">
        <img src={logo} alt="logo" className="h-12 w-20 sm:h-20 sm:w-32" />
      </div>
      <div className="after:emoji text-2xl sm:text-4xl animate-bounce-slow"></div>
      <div
        onClick={handleProfileNavigation}
        className="cursor-pointer h-12 w-12 sm:h-20 sm:w-20 bg-skin-secondary rounded-full m-2 sm:m-10 flex items-center justify-center"
      >
        <Avatar w={12} smh={20} smw={20} />
      </div>
    </header>
  );
}


