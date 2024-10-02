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
                <BiDollar/>
            )
        }

    </div>
  )
}
export default Input