import Header from "./Header"
import MyFooter from "./MyFooter";

export default function Layout({children}){
    return(
        <div>
            <Header/>
            <h1>Layout</h1>
            <div>{children}</div>
            <MyFooter/>
        </div>
    );
}