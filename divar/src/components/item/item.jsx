// import Image from "next/image";
// import img1 from '../../public/image/item/shoes.png'
import Link from "next/link";
import { PiCameraSlashLight } from "react-icons/pi";

const Item = (props) => {
    return (
        <Link href={props.hrefId} className="xl:basis-4/12 md:basis-6/12 px-2 basis-full" >
            <div className="flex w-full justify-between border-2 border-zinc-200 rounded-md p-4 shadow-md">
                <div className="flex flex-col items-start justify-between py-2">
                    <div className="w-40 h-12 overflow-hidden">
                        <h2 className="text-[16px] font-bold">{props.name}</h2>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>{props.dynamicFields}</span>
                        <span>{props.price}</span>
                        <span>{props.createTime}</span>
                    </div>
                </div>
                <div>
                    {
                        props.imgLength != 0 ?
                            <picture>
                                <img className="w-[150px] h-[150px] rounded-md" width={150} height={150} src={`${props.image}`} alt="test" />
                            </picture>
                            :
                            <div className="w-[150px] h-[150px] flex justify-center items-center">
                                <PiCameraSlashLight className="w-[100px] h-[100px]" />
                            </div>
                    }
                </div>
            </div>
        </Link>
    );
}

export default Item;