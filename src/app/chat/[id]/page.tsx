import ChatInput from "@/components/ChatInput";
import ChatScreen from "@/components/ChatScreen";

type Props = {
  params: {
    id: string
  }
}

const ChatPage = ({params: { id }}: Props) => {
  return ( 
    <div className="flex flex-col overflow-hidden h-screen pt-3">
      {/* Chat */}
      <ChatScreen chatId={id}/>

      {/* ChatInput */}
      <ChatInput chatId={id}/>
    </div>
   );
}
 
export default ChatPage;