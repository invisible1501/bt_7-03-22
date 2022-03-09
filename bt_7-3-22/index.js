//Xây dụng 1 TO-DO app đơn giản, sử dụng các khái niệm cơ bản của ReactJS. Chi tiết như sau:
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.css'
import Ticket from './ticket';
import _ from 'lodash';


//tạo ra 1 ToDoList container (component to), có các đặc điểm sau:
function ToDoList(props) {
    const [content, setContent] = useState({
        todos: {
            key: 'todos',
            tickets: [],
        },
        inProgress: {
            key: 'in-progress',
            tickets: [],
        },
        done: {
            key: 'done',
            tickets: [],
        },
        needReview: {
            key: 'need-review',
            tickets: [],
        }
    });

    const [input, setInput] = useState("");

    const handleInput = (evt) => {
        setInput(evt.target.value);
    };

    const handleSubmit = (evt) => {
        if(input.length == 0) alert("Please enter content for ticket!");
        else if(input.length < 4) alert("Please enter at least 4 characters!");
        else {
            let _content = {...content};
            let date = new Date();
            let dateTime = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
            _content.todos.tickets.push({
                id: uuidv4(),
                text: input,
                createdDate: dateTime,
                currentColumnKey: 'todos'
            });
            setContent(_content);
        }
    };

    const arrKey = ['todos', 'inProgress', 'done', 'needReview'];

    function handleColumnChange(id, currentColumnKey, targetColumnKey) {
        let _content = {...content};
        let date = new Date();
        let dateTime = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let remove = _.remove(_content[currentColumnKey].tickets, {id: id});
        let ticketRemoved = {
            id: id,
            text: remove[0].text,
            createdDate: dateTime,
            currentColumnKey: targetColumnKey
        }
        _content[targetColumnKey].tickets.push(ticketRemoved);
        setContent(_content);
    }

    function handleDelete(id, currentKey) {
        let _content = {...content};
        _.remove(_content[currentKey].tickets, {id: id});
        setContent(_content);
    }

    return (
        <React.Fragment>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>TO DO</th>
                            <th>IN PROGRESS</th>
                            <th>DONE</th>
                            <th>NEED REVIEW</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{content.todos.tickets.map(todo => {
                                return (
                                    <React.Fragment>
                                        <Ticket id={todo.id} text={todo.text} createdDate={todo.createdDate} currentColumnKey={todo.currentColumnKey}/>
                                        <button onClick={(evt) => handleDelete(todo.id, todo.currentColumnKey)}>Delete</button>
                                        {arrKey.map((key) => {
                                            if(key !== 'todos') return(
                                                <button onClick={(evt) => handleColumnChange(todo.id, todo.currentColumnKey, key)}>Move to {key}</button>
                                            )
                                        })}             
                                    </React.Fragment>
                                )
                            })}</td>
                            <td>{content.inProgress.tickets.map(inProgress => {
                                return (
                                    <React.Fragment>
                                        <Ticket id={inProgress.id} text={inProgress.text} createdDate={inProgress.createdDate} currentColumnKey={inProgress.currentColumnKey}/>
                                        <button onClick={(evt) => handleDelete(inProgress.id, inProgress.currentColumnKey)}>Delete</button>
                                        {arrKey.map((key) => {
                                            if(key !== 'inProgress') return(
                                                <button onClick={(evt) => handleColumnChange(inProgress.id, inProgress.currentColumnKey, key)}>Move to {key}</button>
                                            )
                                        })}  
                                    </React.Fragment>
                                )
                            })}</td>
                            <td>{content.done.tickets.map(done => {
                                return (
                                    <React.Fragment>
                                        <Ticket id={done.id} text={done.text} createdDate={done.createdDate} currentColumnKey={done.currentColumnKey}/>
                                        <button onClick={(evt) => handleDelete(done.id, done.currentColumnKey)}>Delete</button>
                                        {arrKey.map((key) => {
                                            if(key !== 'done') return(
                                                <button onClick={(evt) => handleColumnChange(done.id, done.currentColumnKey, key)}>Move to {key}</button>
                                            )
                                        })}  
                                    </React.Fragment>
                                )
                            })}</td>
                            <td>{content.needReview.tickets.map(needReview => {
                                return (
                                    <React.Fragment>
                                        <Ticket id={needReview.id} text={needReview.text} createdDate={needReview.createdDate} currentColumnKey={needReview.currentColumnKey}/>
                                        <button onClick={(evt) => handleDelete(needReview.id, needReview.currentColumnKey)}>Delete</button>
                                        {arrKey.map((key, index) => {
                                            if(key !== 'needReview') return(
                                                <button onClick={(evt) => handleColumnChange(needReview.id, needReview.currentColumnKey, key)}>Move to {key}</button>
                                            )
                                        })} 
                                    </React.Fragment> 
                                )
                            })}</td>
                        </tr>
                    </tbody>
                </table>
                <input type="textarea" onChange={handleInput}></input><br />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </React.Fragment>
    );
}

export default ToDoList;
// -> Có 4 cột chính: TO DO - IN PROGRESS - DONE - NEED REVIEW
// -> Có 1 ô input để gõ nội dung tạo ticket mới (input type textarea)
// -> Có 1 nút Submit ngay bên dưới ô input, khi click, nó có chức năng thêm vào cột TO DO 1 ticket mới có nội dung như input
// - Nếu ô input nhận vào nội dung rỗng, alert ra "Please enter content for ticket!"
// - Nếu ô input nhận vào nội dung dưới 4 ký tự, alert ra "Please enter at least 4 characters!"
// - Nếu ô input nhận vào giá trị khác rỗng và nhiều hơn 4 ký tự, cho phép tạo thêm 1 ticket, mặc định vào cột TO DO

//tạo ra 1 Ticket (component con), có các đặc điểm sau:
// -> format {
    //   id: uuidv4(),
    //   text: /* = giá trị get về từ input, dạng string*/,
    //   createdDate: /**Sử dụng các hàm date có sẵn của JS, hoặc thư viện về date như: datefns, momentjs, dayjs..., dạng string, giá trị mặc định là thời điểm khi nhấn nút Submit, format: 'DD/MM/yyyy HH:mm:ss' */,
    //   currentColumnKey: /** Định nghĩa ra 4 key tương ứng với 4 cột */
    // }

// -> Hiển thị được thông tin ticket:
// - nội dung
// - ngày lập (sửa gần nhất nếu có)
// - key của cột hiện tại ticket đang thuộc về, 1 trong 4 giá trị: 'todos' | 'in-progress' | 'done' | 'need-review'

// -> Có 4 buttons, xử lý được các case sau:
// - Dựa vào key của ticket hiện tại đang thuộc về, render ra 1 nút Delete và 3 nút Move to *các cột còn lại. Ví dụ:
// ticket đang ở cột TO DO, thì nó có 4 button : move to In Progress, move to Done, move to Need Review, delete

// - Nhận 1 callback function, có 2 tham số là currentColumnkey và targetColumnKey, các button trên sẽ gọi đến hàm này
// ứng với mỗi button mà các giá trị được thay đôi tương đương. Ví dụ:
// ticket đang ở cột TO DO, click vào button move to In Progress thì phải gọi hàm với 2 tham số:
// + currentColumnkey = 'todos'
// + targetColumnKey = 'in-progress'

// Tips: 
// => Tạo ra 1 state content, là 1 object, trong đó có 4 props tương ứng với 4 cột như trên. Giá trị mặc định (nên cho nó vào luôn giá trị mặc định của state, k phụ thuộc vào 1 object khai báo từ trước): 
  
// => Tạo ra 2 hàm (handleColumnChange(currentColumnKey, targetColumnKey) và handleDeleteTicket(ticketId)) để bắt được thay đổi mỗi khi click vào các buttons tương ứng ở dưới component con
// - Khi thay đổi cột mà ticket thuộc về, cột cũ phải remove ticket đó đi, cột mới được thêm ticket đó vào (sử dụng concat hoặc spread operator, không sử dụng push)
// - Khi delete ticket, ticket phải được safe remove ra khỏi state content (không sử dụng delete method trong JS, nếu có thời gian hãy đọc thêm về strict mode và use strict trong JS)
// - Khi delete ticket, nên sử dụng splice hoặc remove của lodash, cho việc handle delete được dễ dàng và an toàn hơn

// => truyền 2 hàm này xuống component con, dưới component con sử dụng useCallback để wrap-up lại 2 hàm đó
// => truyền props content trong vòng lặp (map) xuống component con, dưới component con sử dụng useMemo để wrap-up lại props

// => Khi click vào Submit button và việc tạo ticket mới thành công, thì prop createdDate sẽ được lấy tại thời điểm click

// => sử dụng memo HOC để bọc lại components, quan sát nó bằng cách console.log ra các dòng thông báo mỗi khi thay đổi trạng thái, debug để nắm flow nếu cần

// NOTICE: YÊU CẦU NÂNG CAO:
// -> Các ticket có chức năng edit, mỗi khi click vào content trên ticket thì dòng text sẽ được chuyển thành 1 textarea, với giá trị là giá trị ban đầu, và có thể sửa được nội dung ticket
// -> Điều kiện để sửa ticket vẫn y như tạo mới, nghĩa là có các case xét độ dài của nội dung được truyền vào mà có cho sửa hay không (ví dụ xoá hết text đi thì sẽ alert lên "Please enter content for ticket!")
// -> Sau khi sửa thành công, sẽ thêm vào 1 prop mới cho ticket: lastModifiedDate, sẽ lấy thời gian ngay khi được update content thành công (áp dụng cho cả case thay đổi cột), format giống với createdDate và hiển thị lên ticket

// TIPs: 
// => tạo state đẻ lưu lại các thông tin cho Ticket component
// => tạo thêm các hàm xử lý thay đổi thông tin cho Ticket component, dù điều này sẽ break khái niệm Pure Component, hãy dành thêm thời gian để đọc khái niệm Pure Component trong React
  
// Nếu có thắc mắc hoặc yêu cầu bổ sung, hãy hỏi trên group để nhận trợ giúp kịp thời
// Khuyến khích sử dụng SCSS module, hoặc style-component để style lại app
  