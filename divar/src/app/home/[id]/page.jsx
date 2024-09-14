import Item from "@/components/item/item";
import { getCityPost } from "@/shared/sharedApi";

const test = async ({params}) => {

    let postData = await getCityPost(params.id)
        .then(res => {
            const allData = res?.data?.posts
            return allData;
        })

    return (
        <div className="lg:basis-10/12 basis-full border-r-2 border-zinc-200 h-screen mt-12">
            <h3 className="lg:text-end text-start text-gray-500">دیوار مشهد - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو و دست دوم و کارکرده، استخدام و خدمات</h3>
            <section className="my-5 flex flex-row gap-y-4 flex-wrap">
                {
                    postData.map((data, index) => {
                        return <Item
                            key={index}
                            hrefId={`${params.id} / ${data._id}`}
                            name={data.title}
                            price={data.price.toLocaleString('fa-IR')}
                            dynamicFields={data.dynamicFields[0]?.data}
                            image={ data.pics.length ?`https://divarapi.liara.run/${data.pics[0].path}` : 'image/item/shoes.png'}
                        />
                    })
                }
            </section>
        </div>
    );
}

export default test;