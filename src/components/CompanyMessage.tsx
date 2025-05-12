import React from 'react'
import { useState, useEffect } from 'react'

const CompanyMessage = () => {

      const [typedText, setTypedText] = useState('');

      // Brand description for typing effect
  const brandDescription = "Welcome to Job Seekers Paradise, where your dream job awaits! We connect you with top companies and opportunities tailored just for you. Let's embark on this journey together!";

  // Typing effect logic
  useEffect(() => {
    let index = 0;
    const typingSpeed = 50; // Milliseconds per character
    setTypedText(''); // Reset text on mount or theme change
  
    const type = () => {
      if (index < brandDescription.length) {
        setTypedText(brandDescription.slice(0, index + 1)); // Set text up to current index
        index++;
        setTimeout(type, typingSpeed);
      }
    };
  
    const timer = setTimeout(type, 1000); // Start typing after a slight delay
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []); // Include isWhite to reset typing on theme change


  return (  <div className="relative mx-auto w-11/12 md:w-3/4 max-w-3xl mt-4 md:mt-6">
          <div className={`relative p-6 rounded-lg shadow-md`}>
            <div className="font-bold text-white text-sm md:text-base leading-relaxed min-h-[4rem]">
              {typedText}
              <span className="animate-blink">|</span>
            </div>
          </div>
        </div>
        
  )
}

export default CompanyMessage;