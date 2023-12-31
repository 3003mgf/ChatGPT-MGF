'use client'

import { PlusIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase";

const NewChat = () => {

  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async() =>{
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),{
        userId: session?.user?.email,
        createdAt: serverTimestamp()
      }
    );

    router.push(`/chat/${doc.id}`);
  };

  return ( 
    <div onClick={createNewChat} className="chatRow border-[#BFBFA9] border font-LVRegular text-white">
      <PlusIcon className="h-4 w-4"/>
      <p>New Chat</p>
    </div>
   );
}
 
export default NewChat;


// NOTES
/*
  #Always import useRouter from next/navigation.
  
  #Never use local Timestamp, instead is better to use serverTimeStamp.
*/