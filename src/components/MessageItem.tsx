import { DocumentData } from "firebase/firestore";
import Image from "next/image";

type Props = {
  message : DocumentData
};

const MessageItem = ({ message }: Props) => {

  const isChatMGF = message.user.name === "ChatMGF";

    
  return ( 
    <div className={`py-5 ${isChatMGF && "bg-[#b4b4951c]"} mx-5 font-LVWeb`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img
          src={message.user.avatar}
          alt="Profile Pic"
          className="rounded-full h-6 w-6"
        />
        <p className="pt-1 text-sm">
          {message.text.trim()}
        </p>
      </div>
    </div>
   );
}
 
export default MessageItem;