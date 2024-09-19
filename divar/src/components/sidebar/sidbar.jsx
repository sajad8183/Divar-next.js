'use client'
import Link from "next/link";
import { FaCar, FaChevronDown, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiAparat } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import img1 from '../../public/image/footerImg/image copy.png'
import img2 from '../../public/image/footerImg/image.png'
import img3 from '../../public/image/footerImg/New Project.png'
import { useEffect, useState } from "react";
import axios from "axios";
// import { options } from "../../../backend/app";

const Sidbar = (props) => {

    const [selectIndex, setSelectIndex] = useState(-1)
    const [selectSubIndex, setSelectSubIndex] = useState(-1)

    const [catData, setCatData] = useState([])
    useEffect(() => {

        axios.get('https://divarapi.liara.run/v1/category')
            .then(res => {
                setCatData(res?.data?.data?.categories)
            })
    }, [])

    return (
        <div className=" basis-2/12 mx-12 mt-12 pl-3 lg:block hidden">
            <section className="sidbar_main pb-24 fixed w-[16%] h-screen overflow-y-scroll">
                <Link href={`/home/post?city=${props.cityUrl}`}>
                    <h3>دسته ها</h3>
                </Link>
                <div className="border-b-2 border-zinc-200 text-gray-400">
                    {
                        catData?.map((data, index) => {
                            return (
                                <div className="flex flex-col" key={index} >
                                    <div className="flex items-center w-full py-3 gap-2" >
                                        <FaCar />
                                        <Link href={`/home/post?city=${props.cityUrl}/?categoryId=${data?._id}`} onClick={() => { setSelectIndex(index) }}>{data?.title}</Link>
                                    </div>

                                    <ul className="mr-6 p-2 bg-zinc-50" id="ulHandler">

                                        { index == selectIndex && catData[selectIndex]?.subCategories.map((da, i) => {
                                            
                                            return (
                                                <li className="w-full" key={i}>
                                                    <div className="hover:text-black">
                                                        <Link href={`/home/post?city=${props.cityUrl}/?categoryId=${da?._id}`} onClick={() => { setSelectSubIndex(i) }} className="block py-[5px] transition-all duration-300 ease-in-out" >{da.title}</Link>
                                                    </div>
                                                    <ul className="mr-6 p-2">
                                                        {i == selectSubIndex && catData[selectIndex]?.subCategories[selectSubIndex]?.subCategories.map((d, j) => {
                                                            return (
                                                                <li className="w-full hover:text-black bg-zinc-50 border-r-zinc-200 border-r-2" key={j} >
                                                                    <Link href={`/home/post?city=${props.cityUrl}/?categoryId=${d?._id}`} onClick={()=>{}} className="block py-[5px] pr-2 transition-all duration-300 ease-in-out" >{d.title}</Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })
                    }

                </div>
                <div>

                    {/* {console.log(catData[selectIndex]?.subCategories[selectSubIndex])
                    } */}
                    <form className="max-w-sm mx-auto mt-2">
                        {
                            catData[selectIndex]?.subCategories[selectSubIndex]?.filters.map((filter, index) => {
                                return <select key={index} id="countries" className="bg-gray-50 border-0 border-b-2 border-zinc-300 text-gray-900 outline-none text-sm rounded-md block w-full p-2.5 ">
                                    <option value="DE">{filter?.name}</option>
                                    {
                                        filter?.options.map((option,i)=>{
                                            return <option key={i} value={i}>{option}</option>
                                        })
                                    }
                                </select>
                            })
                        }
                    </form>



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