



const Button = (props) => {
    return (
        <div className={props.buttonStyle}>
            <button className={props.buttonTextStyle} onClick={() => props.link(props.categoryId)}>{props.text}</button>
        </div>
    );
}

export default Button;