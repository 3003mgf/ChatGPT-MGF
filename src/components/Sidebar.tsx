'use client'

import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";
import Image from "next/image";
import Swal from "sweetalert2";
import  { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import ChatRow from "./ChatRow";
import { useEffect } from "react";
import ModelSelection from "./ModelSelection";
import { FaceFrownIcon, InboxIcon } from "@heroicons/react/24/solid";


const Sidebar = () => {

  const { data: session } = useSession(); 

  const [ chats, loading, error ] = useCollection(
    session && query(collection(db, "users", session?.user?.email!, "chats"), orderBy("createdAt", "desc"))
  );

  
  const handleSignOut = () =>{
    Swal.fire({
      icon: "warning",
      iconColor:"#D2D2BC",
      background:"#F8F5F1",
      buttonsStyling:false,
      customClass: {
        confirmButton: "confirmSwalCheckout",
        denyButton: "denySwalCheckout",
        htmlContainer: "htmlContainer",
        title: "swalTitle",
      },
      title: `Hey ${session?.user?.name?.split(" ")[0]}`,
      html: `<p>Are you sure you want to log out? Logging out will end your current session, and you'll need to sign in again to access your account.</p>`,
      showConfirmButton: true,
      confirmButtonText: "Logout",
      showDenyButton: true,
      denyButtonText:"Cancel",
      toast: true
    }).then(result => {
      if(result.isConfirmed){
        signOut();
      }else if(result.isDenied){
        return;
      }
    });
  }

  return ( 
    <div className="p-2 flex flex-col h-screen bg-[#D2D2BC] max-w-xs overflow-y-auto lg:min-w-[20rem]">
      <div className="flex-1">
        <div>


          {/* NewChat */}
          <NewChat/>

          {/* Model Selection */}
          <div className="md:inline hidden sm:hidden font-LVWeb text-sm">
            <ModelSelection/>
          </div>

          {/* If there are no chats */}
          {
            chats?.empty && (
              <div className="flex flex-col gap-2 items-center justify-center font-LVRegular mt-5 text-xs">
                <FaceFrownIcon className="h-5 w-5 text-[#9f9f8b]"/>
                <p className="text-white">No Chats</p>
              </div>
            )
          }

          {/* If chats are loading */}
          {
            loading && (
              <div className="animate-pulse text-center font-LVRegular mt-5 text-sm">
                <p>Loading Chats...</p>
              </div>
            )
          }
          {/* ChatRows */}
          <div className="mt-3 flex flex-col gap-3">
            {chats?.docs.map(chat => {
              return <ChatRow key={chat.id} id={chat.id}/>
            })}
          </div>


        </div>
      </div>

      {/* USER ICON */}
      { session && (
        <Image
          src={session.user?.image!}
          alt="Profile Picture"
          width={24}
          height={24}
          onClick={handleSignOut}
          className="rounded-full cursor-pointer ms-1 mb-1 hover:opacity-50"
        />
      )}
    </div>
   );
}
 
export default Sidebar;