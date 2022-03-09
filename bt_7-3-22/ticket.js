import React, { useState } from "react";

function Ticket(props) {
    const { id, text, createdDate, currentColumnKey, handleColumnChange, handleTicketID } = props;

    let arrKey = ['todos', 'inProgress', 'done', 'needReview'];
    switch(currentColumnKey) {
        case 'todos':
            arrKey = ['inProgress', 'done', 'needReview']
            break;
        case 'inProgress':
            arrKey = ['todos', 'done', 'needReview']
            break;
        case 'done':
            arrKey = ['todos', 'inProgress', 'needReview']
            break;
        case 'needReview':
            arrKey = ['todos', 'inProgress', 'done']
            break;
    }

    const _handleColumnChange = (current, target) => {
        handleColumnChange(current, target);
        console.log(current);
    }

    return (
        <React.Fragment>
            <div>Id: {id}</div>
            <div>Text: {text}</div>
            <div>CreatedDate: {createdDate}</div>
            <div>CurrentColumnKey: {currentColumnKey}</div>
        </React.Fragment>
    )
}

export default Ticket;