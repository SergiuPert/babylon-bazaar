import React from 'react';

function Reviews(props) {
    return (
        <div>
            <h1>Reviews</h1>
            {props.reviews.map((review, index) =>
                <React.Fragment key={index}>
                    <h3>Rating: {review.rating}</h3>
                    <h3>User: {review.userId}</h3>
                    <p>Comment: {review.comment}</p>
                </React.Fragment>
            )}
        </div>
    );
}

export default Reviews;