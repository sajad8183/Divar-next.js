import Image from "next/image";
import logo from '../public/image/image.png'
import img1 from '../public/image/footerImg/image copy.png'
import img2 from '../public/image/footerImg/image.png'
import img3 from '../public/image/footerImg/New Project.png'

import Link from "next/link";
import { FaSearch ,FaTwitter  } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiAparat } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const FirstPage = () => {
    return (
        <div className="flex justify-center">
            <div className="w-[600px]">
                <div className="sm:container mx-auto">
                    <header className="text-[14px]">
                        <div className="flex items-center justify-center">
                            <Image className="w-[140px] h-[90px]" width={150} height={100} src={logo} alt='error' priority={true} />
                        </div>
                        <div className="border-b-[1px] border-zinc-300 my-4 pb-3">
                            <ul className="flex items-center justify-evenly">
                                <li>
                                    <Link href={"/"}>ثبت آگهی</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>دربارهٔ دیوار</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>دریافت برنامه</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>اتاق خبر</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>پشتیبانی</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full mt-8">
                            <p>دﯾﻮار، ﭘﺎﯾﮕﺎه ﺧﺮﯾﺪ و ﻓﺮوش ﺑﯽ‌واﺳﻄﻪ‌!</p>
                            <p className="text-center leading-7 mt-1">اﮔﻪ دﻧﺒﺎل ﭼﯿﺰی ﻫﺴﺘﯽ، ﺷﻬﺮت رو اﻧﺘﺨﺎب ﮐﻦ و ﺗﻮ دﺳﺘﻪ‌ﺑﻨﺪی‌ﻫﺎ ﺑﻪ دﻧﺒﺎﻟﺶ ﺑﮕﺮد. اﮔﺮ ﻫﻢ ﻣﯽ‌ﺧﻮای ﭼﯿﺰی ﺑﻔﺮوﺷﯽ،
                                ﭼﻨﺪ ﺗﺎ ﻋﮑﺲ ﺧﻮب ازش ﺑﮕﯿﺮ و آﮔﻬﯿﺖ رو ﺑﭽﺴﺒﻮن ﺑﻪ دﯾﻮار.</p>
                        </div>
                    </header>
                    <section className="border-b-[1px] border-zinc-300 my-4 pb-3">
                        <div className="flex items-center w-full border-solid border-2 my-8 rounded-md">
                            <FaSearch className="mx-2 w-8 h-5 fill-zinc-400" />
                            <input type="search" className="w-full py-3 px-2 border-0 outline-none" placeholder="جست و جو شهر..." />
                        </div>
                        <div>
                            <h1 className="text-zinc-800 font-bold">شهرهای پربازدید</h1>
                            <ul className="flex flex-wrap items-center justify-evenly gap-20 mx-6 my-8">
                                <li>
                                    <Link href={"/"}>تهران</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>رشت</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>بابل</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>کرج</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>مشهد</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>تهران</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>رشت</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>بابل</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>کرج</Link>
                                </li>
                                <li>
                                    <Link href={"/"}>مشهد</Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <div className="flex items-center justify-center pt-2 border-b-[1px] border-zinc-300 my-4 pb-3">
                            <Image className="w-[80px] h-[80px]" width={80} height={80} src={img3} alt='img1' priority={true} />
                            <Image className="w-[80px] h-[80px]" width={80} height={80} src={img2} alt='img1' priority={true} />
                            <Image className="w-[80px] h-[80px]" width={80} height={80} src={img1} alt='img1' priority={true} />
                        </div>
                        <div className="flex items-center justify-center gap-8 my-8 ">
                            <FaTwitter className="w-8 h-5"/>
                            <AiFillInstagram className="w-8 h-5"/>
                            <FaLinkedin className="w-8 h-5"/>
                            <SiAparat className="w-8 h-5"/>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default FirstPage;