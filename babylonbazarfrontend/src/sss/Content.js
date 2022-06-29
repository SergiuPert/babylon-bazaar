import { useEffect, useState } from 'react'
import MainPage from './MainPage';

const Content = () => {
    let [page, setPage] = useState("Main page")
    let result = ``;
    switch (page) {
        case "Main page":
            result = <MainPage />
            break;
        default:
            result = <MainPage />
    }


    return (
        <div>
            {result}
        </div>
    );
}

export default Content;