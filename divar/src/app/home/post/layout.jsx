import Header from "@/components/header/header";
import Sidbar from "@/components/sidebar/sidbar";
import { getCityParams } from "./page";

const Layout = ({ children }) => {
    
    return (
        <div>
            {/* <Header /> */}
            <div className="mt-8 flex flex-row">
                <Sidbar cityUrl={getCityParams} />
                {children}
            </div>
        </div>
    );
}

export default Layout;