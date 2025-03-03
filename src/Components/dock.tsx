import React from "react";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconFileText,
  IconCode,
} from "@tabler/icons-react";
import Link from "next/link";

export function FloatingDockDemo() {
  const links = [
    { title: "LinkedIn", icon: <IconBrandLinkedin className="h-6 w-6" />, href: "https://www.linkedin.com/in/hetpatel10/" },
    { title: "GitHub", icon: <IconBrandGithub className="h-6 w-6" />, href: "https://github.com/CuriousHet" },
    { title: "Resume", icon: <IconFileText className="h-6 w-6" />, href: "/het_patel_new.pdf" },
    {title: "Kaggle", icon: <IconCode className="h-6 w-6"/>, href: "https://www.kaggle.com/hetpatel10"}
  ];

  return (
    <div>
      {/* Single Floating Dock (Always Top-Center) */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[999] bg-black bg-opacity-30 p-3 rounded-full backdrop-blur-md">
        <div className="flex flex-row space-x-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              target="_blank" // Open link in a new tab
              rel="noopener noreferrer" // Security best practice
              className="w-12 h-12 flex items-center justify-center text-lg font-bold rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
