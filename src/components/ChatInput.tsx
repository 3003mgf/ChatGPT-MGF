'use client'

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string
};

const ChatInput = ({chatId}: Props) => {
  
  const { data: session } = useSession();

  const [prompt, setPrompt] = useState("");

  // NOTE: If we use the same key, in this case 'model', we have access globally to that value.
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003"
  })
  
  const sendMessage = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    if(!prompt) return;

    const myPrompt = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: myPrompt,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
      }
    };

    await addDoc(
      collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
      message
    );


    // Toast Loading
    const notification = toast.loading("ChatMGF is thinking...");

    await fetch('/api/askQuestion', {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        prompt: myPrompt, chatId, session, model
      })
    })
    .then((res)=> res.json())
    .then(async(json) => {
      const text = json.answer.trim();

      const message: Message = {
        text: text || "ChatMGF was unabl to find an answer for that!",
        createdAt: serverTimestamp(),
        user: {
          _id: "ChatMGF",
          name: "ChatMGF",
          avatar: `https://links.papareact.com/89k`
        }
      };

      await addDoc(
        collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
        message
      );
      
      
      // NOTE: We pass the ID so the loading toast is replaced by this
      // and it doesn't generate a new one.
      toast.success("ChatMGF has responded!", {
        id: notification
      })
    })
    .catch(error => console.log(error))
  };

  return ( 
    <div className="bg-[#f2efeb] rounded-lg text-sm font-LVWeb">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input 
          disabled={!session}
          value={prompt}
          onChange={(e)=> setPrompt(e.target.value)}
          type="text" placeholder="Type your message here..." 
          className="bg-transparent flex-1 focus:outline-none tracking-wide disabled:cursor-not-allowed disabled:text-gray-200"
        />
        <button type="submit" disabled={!prompt || !session}
          className="bg-pink-700 hover:opacity-90 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-gray-300/50 disabled:hover:opacity-100"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45"/>
        </button>
      </form>

      <div className="md:hidden">
        {/* Model Selection */}
        <ModelSelection/>
      </div>

    </div>
   );
}
 
export default ChatInput;