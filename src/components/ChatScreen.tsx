'use client'

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import MessageItem from "./MessageItem";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  chatId: string
};

const ChatScreen = ({chatId}: Props) => {

  const { data: session } = useSession();

  const [ messages ] = useCollection(
    session && query(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), orderBy("createdAt", "asc"))
  );

  return ( 
    <div className="flex-1 overflow-y-auto pb-3">
      {
        messages?.empty && (
          <>
            <p className="mt-10 text-center text-sm font-LVWeb">
              Type a prompt in below to get started!
            </p>
            <ArrowDownCircleIcon className="h-7 w-7 mx-auto mt-5 animate-bounce text-pink-700"/>
          </>
        )
      }
      {messages?.docs.map((message) => {
        return <MessageItem key={message.id} message={message.data()}/>
      })}
    </div>
   );
}
 
export default ChatScreen;