//import ComponentName from "./ComponentName.js";

import { useState } from "react";

const ProductForm = (props) => {
	let [pname, setName] = useState("Write name here");
	let [pdesc, setDesc] = useState("Write description here");
	let [pprice, setPrice] = useState("Write price here");
	let [prating, setRating] = useState("Write rating here");
	let [pimage, setImage] = useState("Write image name here");
	let [show, Hide] = useState("Show");
	const setName = (newName) => { pname = newName; }
	const setDesc = (newDesc) => { pdesc = newDesc; }
	const setPrice = (newPrice) => { pprice = newPrice; }
	const setRating = (newRating) => { prating = newRating; }
	const setImage = (newImage) => { pimage = newImage; }
	const Hide = () => { show = "Hide"; }
	const retProduct = () => {
		let product = {
			name: { pname },
			description: { pdesc },
			price: { pprice },
			rating: { prating },
			image: { pimage }
		};
		Hide();
		return this.props.add(product);
	};
	let content = () => {
		return (
			<div class="form">
				<label> Name: <br />
					<input type="text" name="pname" value={pname} oninput={setName(this.value)}/>
				</label> <br /> <br /><label> Description: <br />
					<input type="text" name="pdesc" value={pdesc} oninput={setDesc(this.value)} />
				</label> <br /> <br /><label> Price: <br />
					<input type="text" name="pprice" value={pprice} oninput={setPrice(this.value)} />
				</label> <br /> <br /><label> Rating: <br />
					<input type="text" name="prating" value={prating} oninput={setRating(this.value)} />
				</label><label> Image: <br />
					<input type="text" name="pimage" value={pimage} oninput={setImage(this.value)} />
				</label> <br /> <br />
				<input type="button" onclick={retProduct} />
			</div>
			);
		}
	let empty = () => { return (<div></div>); }
	let result = (show == "Show") ? content : empty;
	return (result);
}

export default ProductForm;