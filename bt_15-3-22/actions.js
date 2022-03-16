import { ADDCART, LOADING, PAYMENT } from "./constants";

export function AddCart(payload) {
    return {
        type: ADDCART,
        payload
    }
}

export function Loading(payload) {
    return {
        type: LOADING,
        payload
    }
}

export function Payment(payload) {
    return {
        type: PAYMENT,
        payload
    }
}