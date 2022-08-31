import React, {useEffect, useState} from 'react';
import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel,} from 'react-accessible-accordion';

const OrderHistory = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://localhost:7136/User/GetOrderHistory`, { method: "GET", credentials: "include" })
            .then(response => response.json())
            .then((response) => { setOrders(response) })
    }, [])

    const totalOrderSum = (order) => {
        let total = 0
        order.orderItems.forEach((orderItem) => {
            total += orderItem.product.price * orderItem.orderItem.quantity;
        })
        return total
    }


    return (
        <div>
            <h1 className="ProfilePageTitle">Order History</h1>

            <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
                <div className={"Accordions"}>
                {orders.map(order =>
                    <div className={"Orders"}>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <h1 className={"OrderHeader"}>{order.order.date.substring(0,10)}</h1>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className={"OrderTable"}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Quantity</td>
                                            <td>Product Name</td>
                                            <td>Price</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderItems.map(orderItem =>
                                            <tr>
                                                <td>{orderItem.orderItem.quantity}</td>
                                                <td>{orderItem.product.name}</td>
                                                <td>{orderItem.product.price}</td>
                                            </tr>
                                        )}
                                    <tr>
                                        <td>Total:</td>
                                        <td>{totalOrderSum(order)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    </div>
                )}
                </div>
            </Accordion>

        </div>
    );
};

export default OrderHistory;