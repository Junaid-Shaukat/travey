'use client';

import Image from "next/image";

import { useRouter } from 'next/navigation'
const Logo = () => {

    const router = useRouter();
  return (
    <Image alt="logo" className="hidden md:block cursor-pointer"
    height="110"
    width="110"
    src="/images/logo.png"
    />
  )
}

export default Logo