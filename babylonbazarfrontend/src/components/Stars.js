import React from 'react';

const Stars = (props) => {
    // let yellowStars = (Math.round(props.rating*2)/2).toFixed(1)
    // console.log(yellowStars)
    // let whiteStars = 5 - yellowStars;
    // console.log(whiteStars)
    // let result = ``;
    // while (yellowStars >= 1) {
    //     // result += `<i class="fa fa-star text-yellow"></i>`;
    //     result += <span>1</span>
    //     yellowStars--;
    // }
    // if (yellowStars == 0.5) {
    //     // result += `<i class="fa fa-star-half-o text-yellow"></i>`;
    //     result += <span>2</span>
    // }
    // while (whiteStars >=1) {
    //     // result += `<i class="fa fa-star-o text-yellow"></i>`;
    //     result += <span>0</span>
    //     whiteStars--;
    // }
    let rating = Math.round(props.rating * 2) / 2;
    let output = [];

    for (let i = rating; i >= 1; i--) {
        output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
        if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    }


    for (let i = (5 - rating); i >= 1; i--) {
        output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    }
    let result = output.join('')
    return (
        <span>{result}</span>
    );
};

export default Stars;