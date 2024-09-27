import Header from "@/components/header/header";
import Sidbar from "@/components/sidebar/sidbar";
// import { AllSearchParams } from "./page";

const Layout = ({ children }) => {
    
    return (
        <div>
            {/* <Header /> */}
            <div className="mt-8 flex flex-row">
                <Sidbar />
                {children}
            </div>
        </div>
    );
}

export default Layout;