import React from 'react';

const ProfileButton = (props) => {
    return (
        <div className={props.buttonStyle} onClick={() => props.link(props.text)}>
            <button className={props.buttonTextStyle} >{props.text}</button>
        </div>
    );
};

export default ProfileButton;