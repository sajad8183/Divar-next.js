import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch, FaRegUser ,FaLayerGroup , FaChevronDown } from "react-icons/fa";
import { IoChatbubbleOutline, IoChatbubbles } from "react-icons/io5";
import { GrSupport } from "react-icons/gr";
import { MdOutlineLanguage } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import logo from "../../public/image/image.png"
const Header = () => {
    return (
        <header className="border-b-2 border-zinc-200 fixed w-full bg-white top-0">
            {/* for desktop */}
            <nav className="lg:block hidden">
                <div className="m-auto">
                    <section className="flex items-center justify-between mx-6">
                        <div className="flex items-center justify-start gap-6 w-[50%]">
                            <Image className="w-[90px] h-[60px]" width={90} height={60} src={logo} alt="divar" />
                            <button className="flex items-center">
                                مشهد
                                <IoLocationOutline />
                            </button>
                            <div className="flex items-center p-2 rounded-lg hover:bg-zinc-100">
                                <span className="w-16">دسته ها</span>
                                <FaChevronDown />
                            </div>
                            <div className="flex items-center bg-zinc-200 rounded-md w-[80%] ">
                                <input className="p-2 bg-transparent w-full outline-none" type="search" name="" id="" placeholder="جستجو در همه آگهی ها" />
                                <FaSearch className="m-2 fill-zinc-400" />
                            </div>
                        </div>
                        <div>
                            <ul className="flex items-center justify-end gap-8">
                                <li className="flex items-center gap-2">
                                    <FaRegUser />
                                    <span>دیوار من</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IoChatbubbleOutline />
                                    <span>چت</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <GrSupport />
                                    <span>پشتیبانی</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <MdOutlineLanguage />
                                    <span>Fa</span>
                                </li>
                                <li className="flex items-center gap-2 bg-red-700 p-3 rounded-md text-white">
                                    <span>ثبت آگهی</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </nav>
            {/* for small size */}
            <section className="lg:hidden block bg-zinc-100 fixed top-0 w-full">
                <div className="flex justify-between px-2 items-center border-zinc-300 rounded-sm border-2 m-2">
                <div className="flex items-center w-full">
                    <input className="p-2 bg-transparent w-full" type="search" name="" id="" placeholder="جستجو در همه آگهی ها" />
                    <FaSearch className="m-2 fill-zinc-400" />
                </div>
                <button className="flex items-center px-2 border-r-2 border-zinc-300">
                    مشهد
                    <IoLocationOutline />
                </button>
                </div>
            </section>
            <nav className="fixed bottom-0 w-full py-2 lg:hidden block text-[12px] bg-zinc-100">
                <ul className="flex items-center justify-evenly gap-8">
                    <li className="flex items-center gap-2 sm:flex-row flex-col">
                        <span>دیوار</span>
                        <span> آگهی</span>
                    </li>
                    <li className="flex items-center gap-2 sm:flex-row flex-col">
                        <FaLayerGroup className="w-5 h-5" />
                        <span>دسته ها</span>
                    </li>
                    <li className="flex items-center gap-2 sm:flex-row flex-col">
                        <IoMdAddCircle className="w-5 h-5" />
                        <span>ثبت آگهی</span>
                    </li>
                    <li className="flex items-center gap-2 sm:flex-row flex-col">
                        <IoChatbubbles className="w-5 h-5" />
                        <span>چت</span>
                    </li>
                    <li className="flex items-center gap-2 sm:flex-row flex-col">
                        <FaRegUser className="w-5 h-5" />
                        <span>دیوار من</span>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;