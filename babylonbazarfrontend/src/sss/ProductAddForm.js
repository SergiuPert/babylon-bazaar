//import ComponentName from "./ComponentName.js";
// need a way to pass categories to select from...

import { useEffect, useState } from 'react'

const ProductAddForm = (props) => {
	let [pname, setName] = useState("Write name here");
	let [pdesc, setDesc] = useState("Write description here");
	let [pprice, setPrice] = useState("Write price here");
	let [prating, setRating] = useState("Write rating here");
	let [pimage, setImage] = useState("Write image name here");
	let [psupplier, setSupplier] = useState("Write supplier name here");
	let [show, Hide] = useState("Show");
	//const setName = (newName) => { pname = newName; }
	//const setDesc = (newDesc) => { pdesc = newDesc; }
	//const setPrice = (newPrice) => { pprice = newPrice; }
	//const setRating = (newRating) => { prating = newRating; }
	//const setImage = (newImage) => { pimage = newImage; }
	//const setSupplier = (newSupplier) => { psupplier = newSupplier; }
	//const Hide = () => { show = "Hide"; }
	//const Show = () => {
	//	show = "Show";
	//}
	const retProduct = () => {
		let name = document.getElementById("name").value
		let desc = document.getElementById("desc").value
		let price = document.getElementById("price").value
		let rating = document.getElementById("rating").value
		let image = document.getElementById("image").value
		let supplier = document.getElementById("supplier").value
		let product = {
			name: { name },
			description: { desc },
			price: { price },
			rating: { rating },
			image: { image },
			supplier: { supplier}
		};
		console.log(product)
		props.add(product)
		//return this.props.add(product);

	};
	//useEffect(Show);
	return (
		<div >
			<label> Name: <br />
				<input id="name" type="text" name="pname" defaultValue={pname}   />
			</label> <br /> <br /><label> Description: <br />
				<input id="desc" type="text" name="pdesc" defaultValue={pdesc} />
			</label> <br /> <br /><label> Price: <br />
				<input id="price" type="text" name="pprice" defaultValue={pprice} />
			</label> <br /> <br /><label> Rating: <br />
				<input id="rating" type="text" name="prating" defaultValue={prating} />
			</label> <br /> <br /><label> Image: <br />
				<input id="image" type="text" name="pimage" defaultValue={pimage} />
			</label> <br /> <br /><label> Supplier: <br />
				<input id="supplier" type="text" name="psupplier" defaultValue={psupplier} />
			</label> <br /> <br />
			<button type="button" onClick={() => retProduct()}>Add</button>
			{/*<input type="button" value="Add"  />*/}
		</div>
		);
	//let empty = () => { return (<div></div>); }
	//let result = (show == "Show") ? content : empty;
	//return (result);
}

export default ProductAddForm;