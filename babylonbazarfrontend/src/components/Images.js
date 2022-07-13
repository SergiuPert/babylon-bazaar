import React from 'react';

function Images(props) {
    return (
        <div>
            <h1>Images:</h1>
            {props.images.map((image, index) =>
            <React.Fragment key={index}>
                <p>{image.name}</p>
            </React.Fragment>
            )}
        </div>
    );
}

export default Images;