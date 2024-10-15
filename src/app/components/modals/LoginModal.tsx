"use client"; 
import axios from "axios"; 
import {signIn} from "next-auth/react";
import { use, useCallback, useState } from "react"; 
import { AiFillGithub } from "react-icons/ai"; 
import { FcGoogle } from "react-icons/fc"; 
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"; 
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons
import useRegisterModal from "@/app/hooks/useRegisterModal"; 
import useLoginModal from "@/app/hooks/useLoginModal"; 
import Modal from "./Modal"; 
import Heading from "../Heading"; 
import Input from "@/app/components/inputs/Input"; 
import toast from "react-hot-toast"; 
import Button from "../Button"; 
import { useRouter } from "next/navigation";

const LoginModal = () => { 
  const router = useRouter();
  const registerModal = useRegisterModal(); 
  const LoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<FieldValues>({ 
    defaultValues: { 
      email: "", 
      password: "", 
    }, 
  }); 

  const onSubmit: SubmitHandler<FieldValues> = (data) => { 
    setIsLoading(true); 
   
    signIn("credentials", {
      ...data,
      redirect: false,
    })
    .then((callback)=>{
      setIsLoading(false);

      if(callback?.ok){
        toast.success("Logged in successfully");
        router.refresh();
        LoginModal.onClose();
      }

      if(callback?.error){
        toast.error(callback.error);
      }
    })
  }; 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const bodyContent = ( 
    <div className="flex flex-col gap-4"> 
      <Heading 
        title="Welcome back!" 
        subtitle="Login to your account" 
      /> 
      <Input 
        id="email" 
        label="Email" 
        type="email" 
        disabled={isLoading} 
        register={register} 
        errors={errors} 
        required 
      /> 
     
      <div className="relative"> {/* Wrapping input in a relative div for absolute positioning of the icon */}
        <Input 
          id="password" 
          label="Password" 
          type={showPassword ? "text" : "password"} // Change input type based on state
          disabled={isLoading} 
          register={register} 
          errors={errors} 
          required 
        /> 
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={togglePasswordVisibility}>
          {showPassword ? <AiFillEyeInvisible size={24}/> : <AiFillEye size={24}/>} {/* Toggle icon based on visibility */}
        </div>
      </div> 
    </div> 
  ); 

  const footerContent = ( 
    <div className="flex flex-col gap-4 mt-3"> 
      <hr /> 
      <Button outline label="Continue with Google" icon={FcGoogle} /> 
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={()=>signIn('github')} /> 
      <div className="text-neutral-500 text-center mt-4 font-light"> 
        <div className="justify-center flex flex-row items-center gap-2"> 
          <div>Don't have an account?</div> 
          <div onClick={registerModal.onOpen} 
            className="text-neutral-800 cursor-pointer hover:underline font-bold"> 
           <span onClick={LoginModal.onClose} >Sign Up</span>
          </div> 
        </div> 
      </div> 
    </div> 
  ); 

  return ( 
    <Modal 
      disabled={isLoading} 
      isOpen={LoginModal.isOpen} 
      title="Login" 
      actionlabel="Continue" 
      onClose={LoginModal.onClose} 
      onSubmit={handleSubmit(onSubmit)} 
      body={bodyContent} 
      footer={footerContent} 
    /> 
  ); 
}; 

export default LoginModal;
