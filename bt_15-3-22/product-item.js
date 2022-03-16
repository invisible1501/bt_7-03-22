import React from "react";
import './product.css'

function ProductItem(props) {
    const { productItem, id, addCart } = props;

    return (
        <div className="wrapper">
            <div className="image">
                <img src={productItem.image} />
            </div>
            <div className="name">{productItem.name}</div>
            <div className="price">${productItem.price}</div>
            <div className="quantity">{productItem.quantity}</div>
            <div><button disabled={productItem.quantity === 0} onClick={(evt) => addCart(productItem.id)}>Add To Cart</button></div>
        </div>
    )
}

export default ProductItem;