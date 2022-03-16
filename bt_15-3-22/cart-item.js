import React from "react";
import './product.css'

function CartItem(props) {
    const { cartItem, index } = props;

    return (
        <tr>
            <td>{index}</td>
            <td className="image"><img src={cartItem.image}/></td>
            <td>{cartItem.name}</td>
            <td>{cartItem.quantity}</td>
            <td>{cartItem.price}</td>
        </tr>
    )
}

export default CartItem;