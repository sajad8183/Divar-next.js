import Item from "@/components/item/item";

const test = () => {
    return (
        <div className="lg:basis-10/12 basis-full border-r-2 border-zinc-200 h-screen mt-12">
            <h3 className="lg:text-end text-start text-gray-500">دیوار مشهد - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو و دست دوم و کارکرده، استخدام و خدمات</h3>
            <section className="my-5 flex flex-row gap-y-4 flex-wrap">
            <Item/>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            </section>
        </div>
    );
}

export default test;