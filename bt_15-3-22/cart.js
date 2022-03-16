import React from "react";
import { connect } from "react-redux";
import CartItem from "./cart-item";
import { Link } from "react-router-dom";
import './product.css';
import { Payment } from "./actions";

function Cart(props) {
    const { cart, payment, walletAmount } = props;

    let _total = 0;

    cart.map(cart => {
        _total += cart.quantity * cart.price;
    })

    const handlePayment = (totalPay) => {
        alert(`Số tiền còn lại sau khi thanh toán ${_total} là ${walletAmount - _total}`);
        payment && payment({ totalPay });
    }

    return (
        <React.Fragment>
            <div className="toHome link"><Link to="/"><button>Home</button></Link>Số tiền bạn đang có: {walletAmount}</div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>IMAGE</th>
                        <th>NAME</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((cartItem, index) => {
                        return (
                            <CartItem key={cartItem.id}
                                cartItem={cartItem}
                                index={index + 1}
                            />
                        )
                    })}
                    <tr>
                        <td colSpan={3} style={{ textAlign: "left" }}>TOTAL</td>
                        <td>{_total}</td>
                        <td><button onClick={(evt) => handlePayment(_total)}>Payment</button></td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
}

const mapStateToPropCart = state => {
    return {
        cart: state.ReduxReducerProductPage.cart,
        walletAmount: state.ReduxReducerProductPage.walletAmount
    }
}

const mapDispatchToPropCart = dispatch => {
    return {
        dispatch,
        payment: ({ totalPay }) => dispatch(Payment({ totalPay })),
    }
}

export default connect(mapStateToPropCart, mapDispatchToPropCart)(Cart);