'use client';

import SignInForm from '@/components/SignInForm';
import React from 'react'

const page = () => {

    const onsubmit = (data: any) => {
        console.log(data);
        
    }

  return (
    <div>
        <SignInForm onSubmit={onsubmit} />
    </div>
  )
}

export default page