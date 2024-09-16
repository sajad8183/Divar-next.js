import Image from "next/image";
import loadImg from '../../../public/loading/Dual Ring@1x-1.0s-200px-200px.gif'
const loading = () => {
    return (
        <div className="w-screen h-screen bg-[#8e8e8e3b] flex items-center justify-center">
            <Image width={150} height={150} src={loadImg} alt="loading..."/>
        </div>
    );
}

export default loading;