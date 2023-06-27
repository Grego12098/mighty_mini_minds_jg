import bunnyAvatar from "../Img//avatar-animations/bunnyFrame-1.png";
import chickenAvatar from "../Img//avatar-animations/chickenFrame-1.png";
import goatAvatar from "../Img//avatar-animations/goatFrame-1.png";
import catAvatar from "../Img//avatar-animations/catFrame-1.png";
import { useGet } from "../hooks/useGet";

export default function Avatar({ animation, h, smw, smh, selection }) {

  const {data: avatar, isLoading, isError, error} = useGet();
  const userAvatar = avatar? avatar.avatar_url:null;

  let imageURL = bunnyAvatar

  if(selection === "Bunny" || userAvatar === "Bunny"){
    imageURL = bunnyAvatar
  }
  if(selection === "Goat" || userAvatar === "Goat"){
    imageURL = goatAvatar
  }
  if(selection === "Cat" || userAvatar === "Cat"){
    imageURL = catAvatar
  }
  if(selection === "Chicken" || userAvatar === "Chicken"){
    imageURL = chickenAvatar
  } else{}
  const bounceAnimation = animation ? "animate-bounce" : "";
  return (
    <div className="flex justify-center items-center">
      {/* <img src={avatar} alt="avatar" className={`h-12 sm:h-20 sm:w-20 ${animation}`} /> */}
      <img src={imageURL} alt="avatar" className={`h-${h} sm:w-${smw} sm:h-${smh} ${bounceAnimation}`} />
    </div>
  );
}

