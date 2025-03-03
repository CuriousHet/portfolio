"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import "@/styles/fonts.css"

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-[#EFDFBB] to-[#c0a97f] py-4 bg-clip-text text-center text-4xl  tracking-tight text-transparent md:text-7xl fredericka-the-great-regular font-bold"
      >
        Projects <br />
      </motion.h1>
    </LampContainer>
  );
}
