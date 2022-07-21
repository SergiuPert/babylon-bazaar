
const Button = (props) => {
    return (
        <div className={props.buttonStyle} onClick={() => props.link(props.categoryId)}>
            <button className={props.buttonTextStyle} >{props.text}</button>
        </div>
    );
}

export default Button;