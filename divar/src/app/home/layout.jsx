import Header from "@/components/header/header";

const LayOut = ({ children }) => {
    
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
}
export default LayOut;