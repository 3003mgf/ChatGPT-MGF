import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Swal from "sweetalert2";

type Props = {
  id: string
};


const ChatRow = ({id}: Props) => {

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [ messages ] = useCollection(
      session && query(collection(db, "users", session?.user?.email!, "chats", id, "messages"), orderBy("createdAt", "asc"))
  );

  const removeChat = () =>{
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
      html: `<p>Are you sure you want to delete this chat? This action is permanent and it can't be undone.`,
      showConfirmButton: true,
      confirmButtonText: "Delete",
      showDenyButton: true,
      denyButtonText:"Cancel",
      toast: true
    }).then(async(result) => {
      if(result.isConfirmed){
        await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
        router.replace("/");
      }else if(result.isDenied){
        return;
      }
    });
  };


  useEffect(() => {
    if(!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname, id]);

  return <Link
    href={`/chat/${id}`}
    className={`chatRow justify-center ${active && 'bg-[#c6c6b0] hover:bg-[#c6c6b0]'} hover:bg-[#cdcdb6]`}
  >
    <ChatBubbleLeftIcon className="h-4 w-4 text-white"/>
    <p className="flex-1 hidden md:inline-flex font-LVRegular text-sm text-[#333332] truncate">
      {messages?.docs[messages?.docs.length - 1]?.data().text || "Empty Chat"}
    </p>
    <TrashIcon
      onClick={removeChat}
      className="h-4 w-4 text-[#a5a58a] hover:text-red-700"
    />
  </Link>
}
 
export default ChatRow;