

const Total = (props) => {
    const cartSum = () => {
        let total = 0
        if (props.cart !== null) {
            props.cart.products.map(product => {
                total += product.product.price * product.cart.quantity
            })
            props.setCartTotal(total)
            return total
        }
    }
    return (
        <div>
            <h1 className={"TotalText"}>Total: {cartSum()}$</h1>
        </div>
    );
};

export default Total;