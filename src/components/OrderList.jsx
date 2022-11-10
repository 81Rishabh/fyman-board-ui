import React from 'react'

function OrderList({initalOrder}) {
    console.log(initalOrder);
  return (
     <React.Fragment>
        {
          initalOrder.length > 0 &&  initalOrder.map((order) => {
            return (
                <li key={order._id} className="order-list-item">
                <div>
                    <p>
                    <span>Sub-Total</span> - {order.sub_total} Rs
                    </p>
                    <p>
                    <span>Phone Number </span> - {order.phone_number}
                    </p>
                </div>
                </li>
            );
        })}
     </React.Fragment>
  )
}

export default OrderList