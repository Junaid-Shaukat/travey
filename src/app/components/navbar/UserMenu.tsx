"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
// import LoginModal from "../modals/LoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps{
  currentUser?: User | null;
}


const UserMenu: React.FC<UserMenuProps>= (
  {
    currentUser
  }
) => {
  const [isOpen, setIsOpen] = useState(false);

// useCallback hook helps to freez function or memorize function when tne components is re rendred
  const toogleOpen = useCallback(()=>{
    setIsOpen((value) =>  !value)
  },[])

  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();


  return (
    <div
      className="
    relative
    "
    >
      <div className="flex flex-row items-center gap-3">
        
        <div onClick={() => {}} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" >
Travey your home
        </div>
        <div onClick={toogleOpen} className="p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">

            <AiOutlineMenu/>
            <div className="hidden md:block">
                <Avatar src={currentUser?.image}/>
            </div>

        </div>
      </div>
      {
        isOpen && (
          <div className="
          absolute
          rounded-xl
          shadow-md
          w-[40vw]
          md:w-3/4
          bg-white
          overflow-hidden
          right-0
          top-12
          text-sm
          ">
            <div className="flex flex-col cursor-pointer">
             {
              currentUser ? ( <>
                <MenuItem onClick={()=>{}} label="My Trips" /> 
                <MenuItem onClick={()=>{}} label="My Favourites" /> 
                <MenuItem onClick={()=>{}} label="My Reservations" /> 
                <MenuItem onClick={()=>{}} label="My Properties" /> 
                <MenuItem onClick={()=>{}} label="Travery my home" /> 
                <hr />
                <MenuItem onClick={()=>{signOut()}} label="Logout" />
                 </>) : (
                <>
                <MenuItem onClick={LoginModal.onOpen} label="Login" /> 
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" /> 
                 </>
              )
             }
            </div>

          </div>
        )
      }
    </div>
  );
};
export default UserMenu;