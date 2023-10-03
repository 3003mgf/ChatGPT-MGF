'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return ( 
    <div className="flex flex-col items-center justify-center h-screen bg-[#F8F5F1]">
      <Image
        src="https://chatgpt-clone-mgf.s3.us-east-2.amazonaws.com/dialogflow-svgrepo-com.svg"
        width={210}
        height={210}
        alt='logo'
        className="mb-5"
      />
      <button onClick={()=> signIn('google')} className="animate-pulse bg-[#D2D2BC] mt-5 px-3 py-2 text-white text-sm tracking-wider">Sign In to use ChatMGF</button>
    </div>
   );
}
 
export default Login;