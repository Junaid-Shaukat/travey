'use client';

import {  FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";


interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    fromatPrice: boolean;
    required?: boolean;
    register:UseFormRegister<FieldValues>;
    errors: FieldErrors;
    }

const Input: React.FC<InputProps>= ({
    id,
    label,
    type = "text",
    disabled = false,
    fromatPrice = false,
    required = false,
    register,
    errors,
}) => {
  return (
    <div className="w-full relative">
        {
            fromatPrice && (
                <BiDollar
                size={24} className="text-netural-700 absolute  top-5 left-2"
                />
            )
        }
        <input
        id={id}
        disabled={disabled}
        {...register(id,{required})}
        placeholder=" "
        type={type}

        className={`peer w-full p-2 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
            ${fromatPrice ? 'pl-9' : 'pl-4'}
            ${errors[id] ? 'border-red-500 focus:border-red-500' : 'border-neutral-200 focus:border-green-600'}
            
            `}
            />

            <label className={`
                absolute
                text-md
                duration-150
                transform
                -translate-y-3
                top-5
                z-10
                origin-[0]

                ${fromatPrice ? 'left-9' : 'left-4'}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                    ${errors[id] ? 'text-red-500' : 'text-zinc-400'}
                `}>{label}</label> 

    </div>
  )
}
export default Input