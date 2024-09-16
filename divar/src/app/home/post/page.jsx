import Item from "@/components/item/item";
import { calcTime } from "@/funcs/funcs";
import { getCityPost } from "@/shared/sharedApi";

export let getCityParams = ''

const Post = async ({ searchParams }) => {

    getCityParams = searchParams.city;
    
    let postData = await getCityPost(searchParams.city)
        .then(res => {
            const allData = res?.data?.posts;
            return allData;
        })

    return (
        <div className="lg:basis-10/12 basis-full border-r-2 border-zinc-200 h-screen mt-12">
            <h3 className="lg:text-end text-start text-gray-500">دیوار مشهد - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو و دست دوم و کارکرده، استخدام و خدمات</h3>
            {postData.length ?
                <section className="my-5 flex flex-row gap-y-4 flex-wrap">
                    {
                        postData.map((data, index) => {                             
                            return <Item
                                key={index}
                                hrefId={`/productDetail?id=${data._id}`}
                                name={data.title}
                                price={data.price.toLocaleString('fa-IR')}
                                dynamicFields={data.dynamicFields[0]?.data}
                                createTime={calcTime(data.createdAt)}
                                image={data.pics.length ? `https://divarapi.liara.run/${data.pics[0].path}` : 'image/item/shoes.png'}
                            />
                        })
                    }
                </section>
                : <div className="w-[100] h-[100] mt-20 text-center text-lg font-bold">هیچ پستی وجود ندارد</div>
            }
        </div>
    );
}

export default Post;