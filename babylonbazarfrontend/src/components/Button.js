



const Button = (props) => {
    return (
        <div>
            <button className={props.class} onClick={() => props.link(props.categoryId)}>{props.text}</button>
        </div>
    );
}

export default Button;