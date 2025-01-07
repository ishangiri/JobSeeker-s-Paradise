import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';



export const Navbar = () => {



    return (
        <div className='bg-slate-800 flex mt-0 justify-evenly'>
            <menu className='m-10'> 
            <p className='sm:text-3xl text-white'>Jobseekers Paradise</p>
            </menu>
            <Button type='button' asChild className='bg-white hover:bg-cyan-50 hover:text-slate-900 text-slate-900 rounded-xl m-10'>
               <Link href='/login'>Login / Sign Up</Link>
            </Button>
        </div>
    )
}