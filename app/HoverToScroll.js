// Make sure this is at the VERY TOP of the file
'use client';

import React, { useRef } from 'react';
import styles from './HoverToScroll.module.css'; // We'll create this CSS file for styling

export default function HoverToScroll() {
  // Create a ref for the target element we want to scroll to
  const targetRef = useRef(null);

  // Function to handle the scroll
  const handleMouseEnter = () => {
    if (targetRef.current) {
      // The magic happens here!
      targetRef.current.scrollIntoView({
        behavior: 'smooth', // Makes the scrolling smooth
        block: 'start',     // Aligns the top of the element to the top of the viewport
      });
    }
  };

  return (
    <div>
      {/* This is the trigger area */}
      <div
        onMouseEnter={handleMouseEnter}
        className={styles.triggerZone}
      >
        <h2>Hover Over Me to Scroll Down</h2>
        <p>👇</p>
      </div>

      {/* An empty spacer to create distance to scroll */}
      <div style={{ height: '150vh' }}></div>

      {/* This is the target element */}
      <div ref={targetRef} className={styles.targetSection}>
        <h2>You've Arrived!</h2>
        <p>Hovering over the top box brought you here.</p>
      </div>

       {/* Another spacer */}
      <div style={{ height: '100vh' }}></div>
    </div>
  );
}