import ProductDetailClient from "@/components/productDetailClient/productDetailClient";
import SwiperImg from "@/components/swiper/swiper";
import { calcTime } from "@/funcs/funcs";
import { getSinglePost } from "@/shared/sharedApi";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";


// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';

const ProductDetail = async ({ searchParams }) => {
    const getData = await getSinglePost(searchParams.id)
        .then(res => {
            return res?.data;
        })

    const getPostCreateTime = calcTime(getData?.post?.createdAt);
    const breadcrumbsItem = getData?.post?.breadcrumbs;
    return (
        <div className="my-16">
            <div className="container mx-auto">
                <section className="flex items-center justify-center  sm:text-sm text-[10px]">
                    <div className="flex items-center justify-center gap-4 md:mt-4 md:mb-8 md:p-4 mb-2 p-2 rounded-lg bg-zinc-100 font-bold">
                        <Link href={`/home/post?city=${getData.post?.city?.id}/?categoryId=${breadcrumbsItem?.category?._id}`} className="flex items-center transition-all duration-300 hover:text-zinc-400">{breadcrumbsItem?.category?.title}
                            <FaAngleLeft className="mr-1" />
                        </Link>
                        <Link href={`/home/post?city=${getData.post?.city?.id}/?categoryId=${breadcrumbsItem?.subCategory?._id}`} className="flex items-center transition-all duration-300 hover:text-zinc-400">{breadcrumbsItem?.subCategory?.title}
                            <FaAngleLeft className="mr-1" />
                        </Link>
                        <Link href={`/home/post?city=${getData.post?.city?.id}/?categoryId=${breadcrumbsItem?.subSubCategory?._id}`} className="flex items-center transition-all duration-300 hover:text-zinc-400">{breadcrumbsItem?.subSubCategory?.title}
                            <FaAngleLeft className="mr-1" />
                        </Link>
                        <span className="sm:flex hidden items-center transition-all duration-300 text-zinc-400">{getData?.post?.title}</span>
                    </div>

                </section>
                {/* <div className="flex lg:flex-row flex-col items-center justify-center xl:mx-8 lg:gap-24 gap-8 ">
                    <div className="xl:basis-1/3 md:basis-2/4 lg:w-fit w-full lg:order-1 order-2 px-8 basis-full">
                        <div className="md:w-full sm:w-[90%] w-full flex justify-center items-center">
                            <div className="text-base flex flex-col gap-4 items-start justify-end sm:w-[90%] w-full">
                                <h1 className="text-lg font-bold">{getData?.post?.title}</h1>
                                <span>{`${getPostCreateTime} در ${getData?.post?.city?.name} | ${getData?.post?.neighborhood?.name}`}</span>
                                <ProductDetailClient />
                                <div className="w-full">
                                    <ul>
                                        {
                                            getData?.post?.dynamicFields.map((data, index) => {
                                                return (
                                                    <li className="w-full flex justify-between items-center border-b-2 border-zinc-200 py-3" key={index}>
                                                        <span>{data.name}</span>
                                                        <span>{data.data}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="my-1 font-bold">توضیحات</h3>
                                    <span>{getData.post.description}</span>
                                </div>

                                <div className="flex items-center flex-wrap text-sm gap-4">
                                    <Link className="bg-zinc-100 p-2 rounded-md" href={''}>لوازم جانبی موبایل و تبلت</Link>
                                    <Link className="bg-zinc-100 p-2 rounded-md" href={''}>لوازم جانبی موبایل و تبلت در فرامرز عباسی</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:basis-1/3 md:basis-2/4 lg:w-fit w-full lg:order-2 order-1 basis-full">
                        <div className="w-full">
                            <SwiperImg imgSRC={getData?.post?.pics} />
                            <div className="w-full">
                                <div className="border-2 rounded-sm border-zinc-200 my-3">
                                    <textarea className="border-0 h-28 w-full p-3" name="" id="" placeholder="یادداشت شما..."></textarea>
                                </div>
                                <p>یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک خواهد شد.</p>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="flex lg:flex-row flex-col justify-center items-center xl:mx-8 lg:gap-24 gap-8 ">
                    <div className="lg:w-2/6 sm:w-3/4 w-11/12 lg:order-1 order-2">
                        <div className="md:w-full sm:w-[90%] w-full flex justify-center items-center">
                            <div className="text-base flex flex-col gap-4 items-start justify-end sm:w-[90%] w-full">
                                <h1 className="text-lg font-bold">{getData?.post?.title}</h1>
                                <span>{`${getPostCreateTime} در ${getData?.post?.city?.name} | ${getData?.post?.neighborhood?.name}`}</span>
                                <ProductDetailClient />
                                <div className="w-full">
                                    <ul>
                                        {
                                            getData?.post?.dynamicFields.map((data, index) => {
                                                return (
                                                    <li className="w-full flex justify-between items-center border-b-2 border-zinc-200 py-3" key={index}>
                                                        <span>{data.name}</span>
                                                        <span>{data.data}</span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="my-1 font-bold">توضیحات</h3>
                                    <span>{getData.post.description}</span>
                                </div>

                                <div className="flex items-center flex-wrap text-sm gap-4">
                                    <Link className="bg-zinc-100 p-2 rounded-md" href={''}>لوازم جانبی موبایل و تبلت</Link>
                                    <Link className="bg-zinc-100 p-2 rounded-md" href={''}>لوازم جانبی موبایل و تبلت در فرامرز عباسی</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-2/6 sm:w-3/4 w-11/12 lg:order-2 order-1">
                        <div className="w-full">
                            <SwiperImg imgSRC={getData?.post?.pics}/>
                            {/* <picture>
                                <img className="w-full lg:h-[25rem] sm:h-[40rem] h-[18rem] object-cover rounded-md" src={`https://divarapi.liara.run/${getData?.post?.pics[0].path}`} alt="test" />
                            </picture> */}
                            <div className="w-full">
                                <div className="border-2 rounded-sm border-zinc-200 my-3">
                                    <textarea className="border-0 h-28 w-full p-3" name="" id="" placeholder="یادداشت شما..."></textarea>
                                </div>
                                <p>یادداشت تنها برای شما قابل دیدن است و پس از حذف آگهی، پاک خواهد شد.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;