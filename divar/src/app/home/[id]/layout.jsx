import Header from "@/components/header/header";
import Sidbar from "@/components/sidebar/sidbar";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="flex flex-row">
                <Sidbar />
                {children}
            </div>
        </div>
    );
}

export default Layout;