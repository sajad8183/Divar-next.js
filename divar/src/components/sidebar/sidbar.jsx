import Link from "next/link";
import { FaCar, FaChevronDown, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiAparat } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import img1 from '../../public/image/footerImg/image copy.png'
import img2 from '../../public/image/footerImg/image.png'
import img3 from '../../public/image/footerImg/New Project.png'
import { getSidebarData } from "@/shared/sharedApi";
const Sidbar = async () => {
    const catData = await getSidebarData()
        .then(res => {
            return res.data.categories
        })

    return (
        <div className=" basis-2/12 mx-12 mt-12 pl-3 lg:block hidden">
            <section className="sidbar_main pb-24 fixed w-[16%] h-screen overflow-y-scroll">
                <h3>دسته ها</h3>
                <div className="border-b-2 border-zinc-200 text-gray-400">
                    {
                        catData.map((data, index) => {
                            return (
                                <div className="flex items-center w-full py-3 gap-2" key={index}>
                                    <FaCar />
                                    <Link href={``}>{data.title}</Link>
                                </div>
                            )
                        })
                    }

                </div>
                <div>
                    <div className="flex items-center gap-2 py-4 px-2 border-b-2 border-zinc-200  rounded-lg hover:bg-zinc-100 ">
                        <FaChevronDown />
                        <span className="">محل</span>
                    </div>
                    <div className="flex items-center gap-2 py-4 px-2 border-b-2 border-zinc-200  rounded-lg hover:bg-zinc-100 ">
                        <FaChevronDown />
                        <span className="">قیمت</span>
                    </div>
                    <div className="flex items-center gap-2 py-4 px-2 border-b-2 border-zinc-200  rounded-lg hover:bg-zinc-100 ">
                        <FaChevronDown />
                        <span className="">وضعیت آگهی</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between">
                    <div>
                        <ul className="flex justify-center items-center gap-4 flex-wrap my-6">
                            <li>
                                <Link className="transition-all duration-300 ease-in-out hover:text-black" href={''}>دربارهٔ دیوار</Link>
                            </li>
                            <li>
                                <Link className="transition-all duration-300 ease-in-out hover:text-black" href={''}>دریافت برنامه</Link>
                            </li>
                            <li>
                                <Link className="transition-all duration-300 ease-in-out hover:text-black" href={''}>اتاق خبر</Link>
                            </li>
                            <li>
                                <Link className="transition-all duration-300 ease-in-out hover:text-black" href={''}>کسب‌وکارها</Link>
                            </li>
                            <li>
                                <Link className="transition-all duration-300 ease-in-out hover:text-black" href={''}>گزارش آسیب‌پذیری</Link>
                            </li>
                            <li>
                                <Link className="transition-all duration-300 ease-in-out hover:text-black" href={''}>پشتیبانی و قوانین</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center gap-8 my-8 ">
                        <FaTwitter className="w-4 h-4 fill-zinc-500 transition-all duration-300 ease-in-out hover:fill-black" />
                        <AiFillInstagram className="w-4 h-4 fill-zinc-500 transition-all duration-300 ease-in-out hover:fill-black" />
                        <FaLinkedin className="w-4 h-4 fill-zinc-500 transition-all duration-300 ease-in-out hover:fill-black" />
                        <SiAparat className="w-4 h-4 fill-zinc-500 transition-all duration-300 ease-in-out hover:fill-black" />
                    </div>
                    <div className="flex items-center justify-center pt-2 border-b-[1px] border-zinc-300 my-4 pb-3">
                        <Image className="w-[65px] h-[65px]" width={65} height={65} src={img3} alt='img1' priority={true} />
                        <Image className="w-[65px] h-[65px]" width={65} height={65} src={img2} alt='img1' priority={true} />
                        <Image className="w-[65px] h-[65px]" width={65} height={65} src={img1} alt='img1' priority={true} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Sidbar;