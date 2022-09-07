import React from 'react';
import Info from "./Info";

const Pagination = (props) => {
    return (
                    <div className={"Flex"}>
                        {props.page > 0 &&
                            <div className={"CategoriesHeaderButton"} onClick={() => props.setPage(props.page - 1)}>
                                <button className={"CategoriesHeaderButtonText"} > Previous </button>
                            </div>
                        }
                        {props.page < props.pages &&
                            <div className={"CategoriesHeaderButton"} onClick={() => props.setPage(props.page + 1)}>
                                <button className={"CategoriesHeaderButtonText"} > Next </button>
                            </div>
                        }
                    </div>
    )}
export default Pagination;