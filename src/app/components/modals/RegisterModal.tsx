"use client"; 
import axios from "axios"; 
import { useCallback, useState } from "react"; 
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

const RegisterModal = () => { 
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
      name: "", 
      email: "", 
      password: "", 
    }, 
  }); 

  const onSubmit: SubmitHandler<FieldValues> = (data) => { 
    setIsLoading(true); 
    axios.post("/api/auth/register", data) 
      .then((response) => { 
        registerModal.onClose();
        toast.success("Account Created Successfully"); 
      }) 
      .catch((error) => { 
        toast.error("Something Went Wrong"); 
      }) 
      .finally(() => { 
        setIsLoading(false); 
      }); 
  }; 

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const bodyContent = ( 
    <div className="flex flex-col gap-4"> 
      <Heading 
        title="Welcome to Travey" 
        subtitle="Create an account to continue" 
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
      <Input 
        id="name" 
        label="Name" 
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
      <Button outline label="Continue with GitHub" icon={AiFillGithub} /> 
      <div className="text-neutral-500 text-center mt-4 font-light"> 
        <div className="justify-center flex flex-row items-center gap-2"> 
          <div>Already have an account?</div> 
          <div onClick={registerModal.onClose} 
            className="text-neutral-800 cursor-pointer hover:underline font-bold"> 
           <span onClick={LoginModal.onOpen} > Login </span>
          </div> 
        </div> 
      </div> 
    </div> 
  ); 

  return ( 
    <Modal 
      disabled={isLoading} 
      isOpen={registerModal.isOpen} 
      title="Register" 
      actionlabel="Continue" 
      onClose={registerModal.onClose} 
      onSubmit={handleSubmit(onSubmit)} 
      body={bodyContent} 
      footer={footerContent} 
    /> 
  ); 
}; 

export default RegisterModal;
