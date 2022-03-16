// Sử dụng các kiến thức về React + redux, bạn hãy tạo 1 ứng dụng mua sắm, với các chức năng được mô tả sau đây:
import React from "react";
import { connect } from "react-redux";
import { AddCart, Loading } from "./actions";
import ProductItem from "./product-item";
import { Link } from 'react-router-dom';
import { LoadingPage } from "./loading";
import "./product.css";
import { useEffect } from "react";
import { useState } from "react";

function ProductList(props) {
    const { products, isLoading, addCart, loading } = props;

    const [isLoad, setLoad] = useState(isLoading);

    const handleAddToCart = (productId) => {
        addCart && addCart({productId});
    }

    function handleLoading() {
        setLoad(false);
    }

    useEffect(() => {
        setTimeout(handleLoading, 1500);
    }, []);

    if(!isLoad) return (
        <div>
            <div className="toCart link"><Link to="/cart"><button>View Cart</button></Link></div>
            <div>
                {products.map(product => {
                    return (
                        <ProductItem key={product.id}
                            productItem={product}
                            id={product.id}
                            addCart={handleAddToCart}
                        />
                    )
                })}
            </div>
        </div>
    );
    else return (
        <LoadingPage />
    )
}

const mapStateToPropProductList = state => {
    return {
        products: state.ReduxReducerProductPage.products,
        cart: state.ReduxReducerProductPage.cart,
        isLoading: state.ReduxReducerProductPage.isLoading
    };
};

const mapDispatchToPropProductList = dispatch => {
    return {
        dispatch,
        addCart: ({productId}) => dispatch(AddCart({productId})),
        loading: () => dispatch(Loading())
    };
};

export default connect(mapStateToPropProductList, mapDispatchToPropProductList)(ProductList);

// Expectation 1:
// -> show được 1 list các sản phẩm điện thoại, là 1 mảng các đối tượng, bao gồm các props theo format sau:
// {
//   id: string,   //tạo ra từ uuid()
//   name: string,
//   image: string   //url import trực tiếp trong folder của dự án,
//   price: number,
//   inCart: boolean,
//   sku: string,   //mã sản phẩm, ví dụ: IP12PRM-256
//   quantity: number,  //số lượng hiện tại trong kho
// }

// -> Chức năng add to cart:
//  - Mỗi sản phẩm đều có 1 button Add to cart
//  - Khi click vào button Add to cart, giỏ hàng trên store redux sẽ được thêm vào món hàng tương ứng


// -> Chức năng xem giỏ hàng:
//  - Khi click vào biểu tượng giỏ hàng, có thể xem thông tin sơ bộ của các sản phẩm hiện tại đang trong giỏ hàng
// bao gồm: ảnh tượng trưng, tên sản phẩm, giá

// Expectation 2:
// -> Nâng cấp chức năng add to cart:
//  - Khi thêm sản phẩm vào giỏ hàng, nếu sku (mã sản phẩm) trùng nhau, thì chỉ hiển thị 1 sản phẩm, show số lượng hiện tại
// đang có trong giỏ tương ứng (ví dụ: iPhone 12 Pro Max 256GB. Số lượng: 2)
//  - Mỗi lần được thêm vào giỏ hàng thành công, quantity của sản phẩm đó sẽ được trừ đi 1 đơn vị
//  - Khi số lượng hàng trong kho về 0, Button Add to cart sẽ bị disabled

// -> Thêm vào chức năng ví + thanh toán:
//  - Tự định nghĩa trên store của redux 1 walletAmount, là 1 number với giá trị mặc định là 100.000.000 đ
//  - Ở page giỏ hàng, có chức năng thanh toán, khi click vào button Thanh toán, sẽ show được lên tổng số tiền cần thanh
// toán + số tiền còn lại trong ví. Nếu thanh toán thành công, số tiền trong ví sẽ bị trừ đi tương ứng với số tiền đã thanh toán.
// Kèm theo đó, alert hoặc show ra popup thông báo số tiền còn lại trong ví sau khi đã thanh toán thành công

// Expectation 3:
// -> Sửa đổi các actions, cần có delay time là 1500ms, kèm theo đó là hiển thị lên loading indicator (nút xoay xoay) khi :
//  - show list sản phẩm
//  - show list trong giỏ hàng
//  - thêm sản phẩm vào giỏ hàng
//  - thanh toán

// tips:
//  - Tạo ra các actions riêng biệt, như demo và bài chữa refer vừa nhận được
//  - Tạo ra reducer chuẩn pure function, sử dụng các method không làm mutate state gốc như spread operator (...),
// concat(), slice(). Hoặc cao cấp hơn thì tham khảo produce method của immer, có thể PM giảng viên để lấy code mẫu
//  - Tạo ra initialState, là 1 object có chứa các giá trị tương ứng như: productList, walletAmount, isLoading...,
// và logic làm thay đổi nó đều được định nghĩa trong reducer
//  - Product List là 1 page, In Cart là 1 page (1 container/smart component), sử dụng connect của react-redux để connect
// với redux store ở các containers này (có actions, có reducer riêng), tránh việc xử lý logic ở dưới component con (Product)
//  - Product là 1 component con, chỉ nhận props và callback functions nhận được từ Product List hoặc In Cart containers
// để xử lý logic, không thêm vào các inner states hoặc các thao tác xử lý logic ở scope của component con
//  - Có thể áp dụng saga cùng các features của nó để làm ra các thao tác loading/async dễ dàng hơn (sử dụng delay của saga
// thay vì setTimeout thông thường của JS)
//  - Nếu có thời gian, hãy đọc qua về @redux-toolkits để đơn giản hoá redux, nhưng vẫn khuyến khích học viên đi theo flow
// truyền thống của redux, bằng cách khai báo các actions, reducer riêng của từng containers

// Lưu ý: nếu có thắc mắc hoặc yêu cầu bổ sung gì, hãy pm trực tiếp với giảng viên