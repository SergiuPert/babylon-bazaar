



const Button = (props) => {
    return (
        <div>
            <button onClick={() => props.link(props.categoryId)}>{props.text}</button>
        </div>
    );
}

export default Button;