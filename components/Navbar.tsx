'use client'
import {
  UserButton,
  useUser
} from "@clerk/nextjs";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return (
      <div>Loading....</div>
    );
  }
  return (
    <div className="absolute top-2 right-6 z-1 bg-zinc-900 flex gap-2 items-center p-1 pr-2 rounded-full shadow-lg shadow-zinc-800">
      <UserButton />
      <div>
        {user?.firstName}
      </div>
      <Link href={"/profile"}>
        <RiArrowDropDownLine style={{ fontSize: "20px" }} />
      </Link>
    </div>
  )
}

export default Navbar