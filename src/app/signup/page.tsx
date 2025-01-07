'use client';

import React from 'react'
import { SignUpForm } from '@/components/SignUpForm'
const page = () => {

    const onsubmit = (data: any) => {
        console.log(data)
    }

  return (
    <div> <SignUpForm onSubmit={onsubmit} /></div>
  )
}

export default page