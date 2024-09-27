'use client'
import Link from "next/link";
import { FaCar, FaChevronDown, FaTwitter, FaArrowRight } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiAparat } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import img1 from '../../public/image/footerImg/image copy.png'
import img2 from '../../public/image/footerImg/image.png'
import img3 from '../../public/image/footerImg/New Project.png'
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

const Sidbar = () => {

    const searchParams = useSearchParams();
    const categoryID = searchParams.get('categoryId')
    const cityId = searchParams.get('city')

    const [catData, setCatData] = useState([])
    useEffect(() => {
        axios.get('https://divarapi.liara.run/v1/category')
            .then(res => {
                const tempArr = res?.data?.data?.categories;

                categoryID === null ? setCatData(tempArr) : tempArr.map(d => {
                    d._id == categoryID ? setCatData([d]) : d.subCategories.map(subCategory => {
                        subCategory._id == categoryID ? setCatData([d]) : subCategory.subCategories.map(subSubCategory => {
                            subSubCategory._id == categoryID && setCatData([d])
                        })
                    })
                })

                // if (categoryID === null) {
                //     setCatData(tempArr)
                // } else {
                //     tempArr.map(d => {
                //         if (d._id == categoryID) {
                //             setCatData([d])
                //         }
                //         d.subCategories.map(subCategory => {
                //             if (subCategory._id == categoryID) {
                //                 setCatData([d])
                //             }
                //             subCategory.subCategories.map(subSubCategory => {
                //                 if (subSubCategory._id == categoryID) {
                //                     setCatData([d])
                //                 }
                //             })
                //         })
                //     })
                // }
            })

    }, [categoryID])

    return (
        <div className=" basis-2/12 mx-12 mt-12 pl-3 lg:block hidden">
            <section className="sidbar_main pb-24 fixed w-[16%] h-screen overflow-y-scroll">
                <h3>دسته ها</h3>
                {categoryID != null && <Link href={`/home/post?city=${cityId}`} className=" my-2 flex items-center justify-start gap-2">
                    <FaArrowRight />
                    <h3>همه آگهی ها</h3>
                </Link>}
                <div className="border-b-2 border-zinc-200 text-gray-400">
                    {
                        catData?.map((data, index) => {
                            return (
                                <div className="flex flex-col" key={index} >
                                    <div className="flex items-center w-full py-3 gap-2 hover:text-black" >
                                        <FaCar />
                                        <Link href={{ pathname: '/home/post', query: { city: cityId, categoryId: data?._id } }} >{data?.title}</Link>
                                    </div>

                                    <ul className="mr-6 p-2 bg-zinc-50" id="ulHandler">
                                        {
                                            categoryID != null && data.subCategories.map((subCategory, i) => {
                                                return (
                                                    <li className="w-full" key={i}>
                                                        <div className="hover:text-black">
                                                            <Link href={{ pathname: '/home/post', query: { city: cityId, categoryId: subCategory?._id } }} onClick={() => { }} className="block py-[5px] transition-all duration-300 ease-in-out" >{subCategory.title}</Link>
                                                        </div>
                                                        <ul className="mr-6 p-2">
                                                            {
                                                                categoryID == subCategory._id && subCategory.subCategories.map((subSubCategory, indexer) => {
                                                                    return (
                                                                        <li className="w-full hover:text-black bg-zinc-50 border-r-zinc-200 border-r-2" key={indexer} >
                                                                            <Link href={{ pathname: '/home/post', query: { city: cityId, categoryId: subSubCategory?._id } }} onClick={() => { }} className="block py-[5px] pr-2 transition-all duration-300 ease-in-out" >{subSubCategory.title}</Link>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            {
                                                                subCategory.subCategories.map((subSubCategory, indexer) => {

                                                                    if (categoryID == subSubCategory._id) {
                                                                        return (
                                                                            <li className="w-full hover:text-black bg-zinc-50 border-r-red-600 border-r-2 text-red-600" key={indexer} >
                                                                                <Link href={{ pathname: '/home/post', query: { city: cityId, categoryId: subSubCategory?._id } }} onClick={() => { }} className="block py-[5px] pr-2 transition-all duration-300 ease-in-out" >{subSubCategory.title}</Link>
                                                                            </li>
                                                                        )
                                                                    }
                                                                    // return (
                                                                    //     <li className="w-full hover:text-black bg-zinc-50 border-r-zinc-200 border-r-2" key={indexer} >
                                                                    //         <Link href={{ pathname: '/home/post', query: { city: cityId, categoryId: subSubCategory?._id } }} onClick={() => { }} className="block py-[5px] pr-2 transition-all duration-300 ease-in-out" >{subSubCategory.title}</Link>
                                                                    //     </li>
                                                                    // )
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>

                <div>
                    <form className="no-select max-w-sm mx-auto mt-2">
                        {
                            catData?.map((allData) => {
                                return (
                                    allData.subCategories.map((subCategory) => {
                                        if (subCategory?._id == categoryID) {
                                            return (
                                                subCategory?.filters.map((subFilter, index) => {
                                                    return (
                                                        <Accordion  key={index}>
                                                            <AccordionItem key={index} aria-label={subFilter.name} title={subFilter.name}>
                                                                <ul>
                                                                    {subFilter?.options.map((option, i) => {
                                                                        return (
                                                                            <li className="p-2 flex w-full items-center justify-between" key={i}>
                                                                                <label className="w-full" htmlFor={i}>{option}</label>
                                                                                <input type="checkbox" id={i} />
                                                                            </li>)
                                                                    })}
                                                                </ul>
                                                            </AccordionItem>
                                                        </Accordion>
                                                    )
                                                })
                                            )
                                        }
                                        else {
                                            return (
                                                subCategory?.subCategories.map(subSubCategory => {
                                                    return (
                                                        subSubCategory?.filters.map((subSubFilter, i) => {
                                                            if (subSubCategory._id == categoryID) {
                                                                return (
                                                                    <Accordion key={i}>
                                                                        <AccordionItem className="border-b-2 border-zinc-200  rounded-lg hover:bg-zinc-50 " key={i} aria-label={subSubFilter.name} title={subSubFilter.name}>
                                                                            <ul className="max-h-[10rem] overflow-y-scroll dir_ltr sidbar_main">
                                                                                {subSubFilter?.options.map((option, ic) => {
                                                                                    return (
                                                                                        <li className=" p-2 flex w-full items-center justify-between hover:bg-zinc-100" key={ic}>
                                                                                            <label className="w-full" htmlFor={ic}>{option}</label>
                                                                                            <input type="checkbox" id={ic} />
                                                                                        </li>)
                                                                                })}
                                                                            </ul>
                                                                        </AccordionItem>
                                                                    </Accordion>
                                                                )
                                                            }
                                                        })
                                                    )
                                                })
                                            )
                                        }
                                    })
                                )
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