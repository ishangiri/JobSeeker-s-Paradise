import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';



export const Navbar = () => {



    return (
        <div className='bg-slate-800 flex mt-0 justify-evenly'>
            <menu className='m-10'> 
            <p className='sm:text-3xl text-white'>Jobseekers Paradise</p>
            </menu>
            <div className='m-10 flex flex-row gap-3'>
            <Button type='button' asChild className='bg-white hover:bg-cyan-50 hover:text-slate-900 text-slate-900 rounded-xl'>
               <Link href='/login'>Login</Link>
            </Button>
            <Button type='button' asChild className='bg-white hover:bg-cyan-50 hover:text-slate-900 text-slate-900 rounded-xl'>
               <Link href='/signup'>Sign Up</Link>
            </Button>
            </div>
        </div>
    )
}