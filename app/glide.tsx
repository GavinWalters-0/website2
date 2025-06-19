'use client';
// glide.tsx
import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';

// It's also good practice to import the CSS from the node_modules folder
import './glide.core.css';
import './glide.theme.css';

export default function GlideComponent() {
  // useRef gives us a reference to the main DOM element of the slider
  const glideRef = useRef(null);

  // useEffect runs after the component's HTML has been rendered to the page
  useEffect(() => {
    // Check if the element we're targeting exists
    if (!glideRef.current) {
      return;
    }

    // Initialize Glide.js. The 'new' keyword is crucial!
    const slider = new Glide(glideRef.current, {
      type: 'carousel',
      startAt: 0,
      perView: 1,
      // Add any other options you need
    }).mount();

    // The return function in useEffect is a cleanup function.
    // It runs when the component is unmounted from the screen.
    // This is very important to prevent memory leaks!
    return () => {
      slider.destroy();
    };
  }, []); // The empty array [] means this effect runs only once after the initial render

  return (
    // Attach the ref to the top-level div for Glide.js to find
    <div className="glide" ref={glideRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          <div className="glide__slide">
            <div className='w-full h-full bg-black'>test</div>
            </div>
        </ul>
      </div>
      <div className="glide__arrows" data-glide-el="controls">
        <button className="glide__arrow glide__arrow--left" data-glide-dir="<" aria-label="Previous slide">&lt;</button>
        <button className="glide__arrow glide__arrow--right" data-glide-dir=">" aria-label="Next slide">&gt;</button>
      </div>
    </div>
  );
}