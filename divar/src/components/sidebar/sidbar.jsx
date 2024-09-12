import Link from "next/link";
import { FaCar } from "react-icons/fa";

const Sidbar = () => {
    return (
        <div className="basis-2/12 mx-12">
            <h3>دسته ها</h3>
            <section >
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
                <div className="flex items-center w-full py-3 gap-2">
                    <FaCar />
                    <Link href={''}>وسایل نقلیه</Link>
                </div>
            </section>
        </div>
    );
}

export default Sidbar;