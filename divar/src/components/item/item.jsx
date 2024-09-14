// import Image from "next/image";
// import img1 from '../../public/image/item/shoes.png'
import Link from "next/link";

const Item = (props) => {
    return (
        <Link href={props.hrefId} className="xl:basis-4/12 md:basis-6/12 px-2 basis-full" >
            <div className="flex w-full justify-between border-2 border-zinc-200 rounded-md p-4 shadow-md">
                <div className="flex flex-col items-start justify-between py-2">
                    <h2 className="text-[16px] font-bold">{props.name}</h2>
                    <div className="flex flex-col gap-2">
                        <span>{props.dynamicFields}</span>
                        <span>{props.price}</span>
                        <span>یک ربع پیش در مشهد، بلوار توس</span>
                    </div>
                </div>
                <div>
                    <img className="w-[150px] h-[150px] rounded-md" width={150} height={150} src={`${props.image}`} alt="test" />
                    {/* <Image className="w-[150px] h-[150px] rounded-md" width={150} height={150} src={`https://divarapi.liara.run/${props.image}`} alt='img1' priority={true} /> */}
                </div>
            </div>
        </Link>
    );
}

export default Item;