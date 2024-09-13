import Image from "next/image";
import img1 from '../../public/image/item/shoes.png'
// lg:basis-5/5 md:basis-1/2
//xl:w-[25%] md:w-[45%] w-full
const Item = () => {
    return (
        <div className="xl:basis-4/12 md:basis-6/12 px-2 basis-full">
            <div className="flex w-full justify-between border-2 border-zinc-200 rounded-md p-4">
                <div className="flex flex-col items-start justify-between py-2">
                    <h2 className="text-[16px] font-bold">کفش مردانه برند nike</h2>
                    <div className="flex flex-col gap-2">
                        <span>در حد نو</span>
                        <span>1,800,000</span>
                        <span>یک ربع پیش در مشهد، بلوار توس</span>
                    </div>
                </div>
                <div>
                    <Image className="w-[150px] h-[150px] rounded-md" width={150} height={150} src={img1} alt='img1' priority={true} />
                </div>
            </div>
        </div>
    );
}

export default Item;