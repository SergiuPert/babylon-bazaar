import { useEffect, useState } from 'react'
import MainPage from './MainPage';

const Content = () => {
    let [page, setPage] = useState("Main page")
    let result = ``;
    switch (page) {
        case "Main page":
            result = <MainPage />
            break;
        // case "Product Details":
        default:
            result = <MainPage />
    }
    //react router DOM v6

    return (
        <div>
            {result}
        </div>
    );
}

export default Content;