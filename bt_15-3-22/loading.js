import React from "react";
import ReactLoading from "react-loading";

export function LoadingPage() {
    return (
        <ReactLoading className="loading" type="bubbles" color="#0000FF" height={100} width={50} />
    )
}