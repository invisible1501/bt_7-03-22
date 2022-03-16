import { find, isEqual } from "lodash";
import { v4 as uuidv4 } from 'uuid';
import { ADDCART, LOADING, PAYMENT } from "./constants";
import { call, put, take, delay } from 'redux-saga/effects';

const initialState = {
    products: [
        {id: uuidv4(), name: 'SP-1', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-2', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-3', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-4', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-5', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-6', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-7', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-8', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-9', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10},
        {id: uuidv4(), name: 'SP-10', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sculptural-furniture-1574790540.jpg?crop=1.00xw:0.534xh;0.00160xw,0.367xh&resize=980:*', price: 100, inCart: false, sku: 'vnn-sp1', quantity: 10}
    ],
    cart: [

    ],
    isLoading: true,
    walletAmount: 100000000
}

function ReduxReducerProductPage(state = initialState, action) {
    let _state = {...state};
    switch(action.type) {
        case ADDCART:
            let _productItem = find(_state.products, product => isEqual(product.id, action.payload.productId));
            _productItem.quantity -= 1;
            if(!_productItem.inCart) {
                let _pushItemCard = {..._productItem, quantity: 1};
                _productItem.inCart = true;
                _state.cart = [..._state.cart, _pushItemCard];
            } else {
                let _cartItem = find(_state.cart, cart => isEqual(cart.id, action.payload.productId));
                _cartItem.quantity += 1;
                _state.cart = [..._state.cart];
            }
            break;
        case LOADING:
            break;
        case PAYMENT:
            _state.walletAmount -= parseInt(action.payload.totalPay);
            break;
    };
    return _state;
}

export default ReduxReducerProductPage;