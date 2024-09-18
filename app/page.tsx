'use client';
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import shuffle from "lodash/shuffle";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineCalendar } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";
import RecentsRoutines from "@/components/RecentsRoutines";

const bg_colors = [
  { bg: "bg-sofblue-gradients", text: "text-navy" },
  { bg: "bg-beige-gradients", text: "text-brown" },
  { bg: "bg-palegreen-gradients", text: "text-forest" },
  { bg: "bg-coral-gradients", text: "text-charcoal" },
  { bg: "bg-gray-gradients", text: "text-white" }
];

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [bgColors, setBgColors] = useState({ bg: '', text: '' });

  useEffect(() => {
    const shuffledColors = shuffle(bg_colors);
    setBgColors(shuffledColors[0]);
  }, []);

  if (!isLoaded || !isSignedIn) {
    return (
      <div>Loading....</div>
    );
  }
  return (
    <div className="h-full">

      <div className={`${bgColors.bg} py-2 pb-10 md:px-5 px-2`}>
        <p className={`${bgColors.text} font-bold capitalize`} style={{ fontSize: "18pt" }}>good to see you {user?.firstName}!!</p>
        <p className={`${bgColors.text} capitalize font-medium mt-3`}>word of the day</p>
        <p className={`${bgColors.text} capitalize font-medium`}>"surviving is winning, whatever you do. Survive"</p>

        <div className="flex flex-col justify-center gap-5 rounded-2xl py-10 bg-zinc-900 mt-5">
          <div className="text-center">
            <p className="text-2xl capitalize font-bold">plan your day with RootIn</p>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div>
              <Link href="/routine" className="flex gap-2 p-2 items-center bg-zinc-700 rounded-md">
                <HiOutlineCalendar className="text-lg" />
                <p>Plan Your Day</p>
              </Link>

            </div>
            <div>

              <Link href="/todo" className="flex gap-2 p-2 items-center">
                <FiShoppingCart className="text-lg" />
                <p>Daily Cart</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content mt-3 md:px-5 px-2">
        <p className="text-lg">Recent RootIns</p>
        <RecentsRoutines/>
      </div>

    </div>
  );
}
