const { default: Header } = require("@/components/header/header");

const LayOut = ({ children }) => {
    
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
}
export default LayOut;