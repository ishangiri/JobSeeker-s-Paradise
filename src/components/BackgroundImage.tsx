import React from 'react'
import Image from 'next/image'

const BackgroundImage: React.FC = () => (
  <div className="fixed inset-0 -z-10">
    <Image
      src="/globe.svg"
      alt="Background Globe"
      fill
      priority
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-slate-900/90" />
  </div>
);

export default BackgroundImage