'use client'
import Link from "next/link";
import { FaCar, FaChevronDown, FaTwitter, FaArrowRight } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiAparat } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import img1 from '../../public/image/footerImg/image copy.png'
import img2 from '../../public/image/footerImg/image.png'
import img3 from '../../public/image/footerImg/New Project.png'
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckPicker } from 'rsuite';

const Sidbar = () => {
    const router = useRouter()
    const pathname = usePathname()
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

    const [feildStatus, setFeildStatus] = useState(true)
    const [priceFlag, setPriceFlag] = useState(true)

    const removeQueryParam = (name, value) => {
        const params = new URLSearchParams(searchParams)
        params.delete(name, value)
        router.replace(`${pathname}?${params.toString()}`)
    };


    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const filterItemImg = () => {
        searchParams.get('hasPhoto') == null ? router.push(pathname + '?' + createQueryString('hasPhoto', 'true'))
            : removeQueryParam('hasPhoto', 'true')
    }

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
                                                    const subFilterdata = subFilter?.options.map(
                                                        item => ({ label: item, value: item })
                                                    );
                                                    return (
                                                        <div className="my-2 border-b-2 border-zinc-200  rounded-lg hover:bg-zinc-50" key={index} >
                                                            <CheckPicker data={subFilterdata} appearance="subtle" placeholder={subFilter.name} className="w-full" />
                                                        </div>
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
                                                                const subSubFilterdata = subSubFilter?.options.map(
                                                                    item => ({ label: item, value: item })
                                                                );
                                                                return (
                                                                    <div className="my-2 border-b-2 border-zinc-200  rounded-lg hover:bg-zinc-50" key={i} >
                                                                        <CheckPicker data={subSubFilterdata} appearance="subtle" placeholder={subSubFilter.name} className="w-full" />
                                                                    </div>
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

                    <div className="border-b-2 border-zinc-200  rounded-lg">
                        <div onClick={() => { setPriceFlag(!priceFlag) }} className="flex items-center gap-2 py-4 px-2  hover:bg-zinc-100 ">
                            <FaChevronDown className={`${priceFlag ? 'rotate-180 ' : 'rotate-0'}`} />
                            <span className="">قیمت</span>
                        </div>
                        <div className={`${priceFlag ? 'hidden ' : 'block'}`}>
                            <div className="flex items-center justify-between gap-4 mb-3">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <label>حداقل</label>
                                    <BsThreeDotsVertical />
                                    <label>حداکثر</label>
                                </div>
                                <div className="flex flex-col items-center justify-between gap-3">
                                    <input className="borderBox w-full p-2 outline-red-600" type="text" placeholder="مثلا 10,000,000 تومان" />
                                    <input className="borderBox w-full p-2 outline-red-600" type="text" placeholder="مثلا 100,000,000 تومان" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="overflow-hidden no-select">
                        <div onClick={() => { setFeildStatus(!feildStatus) }} className="flex items-center gap-2 py-4 px-2 border-b-2 border-zinc-200  rounded-lg hover:bg-zinc-100 ">
                            <FaChevronDown className={`${feildStatus ? 'rotate-180 ' : 'rotate-0'}`} />
                            <span className="">وضعیت آگهی</span>
                        </div>
                        <ul className={`${feildStatus ? 'hidden ' : 'block'}`}>
                            <li className="p-2 flex w-full items-center justify-between">
                                <label htmlFor="pictureToggle" className="w-full">عکس دار</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input checked={searchParams.get('hasPhoto') == null ? false : true} onChange={() => { filterItemImg() }} type="checkbox" value="" className="sr-only peer" id="pictureToggle" />
                                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-zinc-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </li>
                            <li className="p-2 flex w-full items-center justify-between">
                                <label htmlFor="newPostToggle" className="w-full">فوری</label>
                                <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" id="newPostToggle" />
                                    <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-zinc-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </li>
                        </ul>
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