import Link from "next/link";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { FaAngleLeft } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import { CiBookmark } from "react-icons/ci";

const ProductDetailClient = () => {
    return (
        <>
            <div className="flex items-center justify-between w-full border-y-2 border-zinc-300 py-3">
                <div className="flex items-center gap-4">
                    <HiOutlineExclamationTriangle className="h-6 w-6 stroke-2" />
                    <span>زنگ خطرهای قبل از معامله</span>
                </div>
                <div>
                    <FaAngleLeft className="h-6 w-6 stroke-2" />
                </div>
            </div>

            <div className="flex items-center flex-wrap  gap-4">
                <Link href={''} className="flex items-center gap-2 bg-red-700 py-2 w-28 font-medium rounded-md text-white hover:bg-red-600">
                    <span className="mx-auto">اطلاعات تماس</span>
                </Link>
                <Link href={''} className="flex items-center gap-2 border-2 border-zinc-300 py-2 w-28 font-medium rounded-md hover:bg-zinc-100">
                    <span className="mx-auto">چت</span>
                </Link>
                <button className="outline-none border-0 rounded-full hover:bg-zinc-100 p-2">
                    <CiBookmark className="h-4 w-4 stroke-2" />
                </button>
                <button className="outline-none border-0  rounded-full hover:bg-zinc-100 p-2">
                    <HiOutlineShare className="h-4 w-4 stroke-2" />
                </button>
            </div>
        </>
    );
}

export default ProductDetailClient;