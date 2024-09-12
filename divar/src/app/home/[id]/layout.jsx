import Header from "@/components/header/header";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default Layout;