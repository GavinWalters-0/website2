'use client';
// glide.tsx
import React, { useState,useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';

// It's also good practice to import the CSS from the node_modules folder
import './glide.core.css';
import './glide.theme.css';


import basf_logo from "@/gavin/assets/clients/basf_ce2f9bd952.webp"
import ford_logo from "@/gavin/assets/clients/thumbnail_ford_ee0e9b2d86.webp"
import gmc_logo from "@/gavin/assets/clients/thumbnail_gmc_95006a2d52.webp"
import iso_logo from "@/gavin/assets/clients/thumbnail_iso_02fec3cb11.png"
import vw_logo from "@/gavin/assets/clients/vw_f305f4f015.webp"
import mmc from "@/gavin/assets/partners/motor_city_casino_d4a9aba44e.webp" 

import acca from "@/gavin/assets/partners/acca_b51ba0d60b.png"
import aws from "@/gavin/assets/partners/aws_4af2aedbf3.png"
import mca from "@/gavin/assets/partners/mca_logo_272f2219da.png"
import pfi from "@/gavin/assets/partners/pfi_logo_5ed082e1a1.png"
import rses from "@/gavin/assets/partners/rses_9aa9a66fed.png"
import aia from "@/gavin/assets/partners/aia_42ea7d8cdc.svg"
import dcc from "@/gavin/assets/partners/DCC_Logo_METUS_Primary.png"


const logos = [
   basf_logo, mca, pfi, ford_logo, gmc_logo,iso_logo,vw_logo,mmc, acca, aws, rses, aia, dcc,
];

import Image from 'next/image';


export default function GlideComponent() {
  const clients = [basf_logo, ford_logo, gmc_logo,iso_logo,vw_logo,mmc];
  // Ref for the slider's main DOM element
  const glideRef = useRef(null);
  
  // Effect for initializing the slider (runs only once on mount)
  useEffect(() => {
    if (!glideRef.current) {
      return;
    }

    // Initialize Glide.js with options from your code snippet
    const glide = new Glide(glideRef.current, {
      type: 'carousel',
      perTouch: 5,
      animationTimingFunc: 'ease-in-out',
      perView: 7, // From your snippet
      hoverpause: false, // From your snippet
      autoplay: 2500, // Use initial state value
    });

    // Mount it and save the instance to state
    glide.mount();

    // Cleanup function to destroy the slider on component unmount
    return () => {
      glide.destroy();
    };
  }, []); // Empty array ensures this runs only once

  // Effect for updating the slider when autoplaySpeed changes
  return (
    <>
      <div className="glide" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides flex items-center">
            		{logos?.map((c, index) => (
                  <div key={`l-${index}`} id={`index`} className="glide__slide">
                    <div className='flex items-center justify-center w-full h-full'>
					          <Image className="h-auto w-auto max-h-[5rem] max-w-[10rem]" src={c} alt={"t"}/>
                  </div>
                </div>
			))}
          </ul>
        </div>
      </div>
    </>
  );
}