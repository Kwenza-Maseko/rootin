'use client'
import { GoHomeFill } from 'react-icons/go';
import { FaRoute } from 'react-icons/fa6';
import { LuListTodo } from 'react-icons/lu';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
const icons = [
  { component: GoHomeFill, label: "home", url: "/" },
  { component: FaRoute, label: "daily routine", url: "/dailyroutine" },
  { component: LuListTodo, label: "toDo list", url: "/todolist" }
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div>
      <Link href={"/"}>
        <div className="flex items-center p-2 mb-5">
          <Image
            src={"/assets/RootIn.png"}
            alt='logo'
            width={80}
            height={40}
          />
        </div>
      </Link>
      {
        <div className="w-44 flex flex-col gap-1">
          {icons.map((iconObj, index) => {
            const IconComponent = iconObj.component;
            return (
              <Link href={iconObj.url} key={index}>
                <div className={`${pathname === iconObj.url && ("bg-zinc-600")} flex gap-2 items-center hover:bg-zinc-600 p-1 rounded`}>
                  <IconComponent style={{ fontSize: '18px' }} />
                  <p className='capitalize'>{iconObj.label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      }
    </div>
  )
}

export default Sidebar