'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import{
    FieldValues,set,SubmitHandler,useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from "@/app/components/inputs/Input"



const RegisterModal = () => {

    const registerModal = useRegisterModal();

    const[isLoading,setIsLoading] = useState(false);

    const {
        register,handleSubmit,formState:{errors}

    } = useForm<FieldValues>({ defaultValues: {
        name: "",
        email: "",
        password: "",
    }});

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        axios.post('/api/register',data)
        .then((response) => {
            console.log(response);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false); 
        } 
    )
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>

        <Heading 
        title="Welcome to Travey"
        subtitle="Create an account to continue"
        />
        <Input/>

        </div>
    )
  

   

  return (
    <Modal disabled={isLoading}
    isOpen={registerModal.isOpen}
    title='Register'
    actionlabel='Continue'
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}

    />
  )
}
export default RegisterModal