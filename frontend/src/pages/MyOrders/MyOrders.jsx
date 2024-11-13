// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';
// import './MyOrders.css';

// const MyOrders = () => {

//     const {url,token} = useContext(StoreContext);
//     const [data,setData] = useState([]);

//     const fetchOrders = async ()=>{
//         const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
//         setData(response.data.data);
        
//     }

//     useEffect(()=>{
//         if (token) {
//            fetchOrders(); 
//         }
//     },[token])


//   return (
//     <div className='my-orders'>
//         <h2>My Orders</h2>
//         <div className='container'>
//             {data.map((order,index)=>{
//                 return(
//                     <div key={index} className="my-orders-order">
//                         <img src={assets.parcel_icon} alt="" />
//                         <p>{order.items.map((item,index) => {
//                             if (index === order.items.length-1) {
//                                 return item.name+" x "+item.quantity
//                             }
//                             else{
//                                 return item.name+" x "+item.quantity +","
//                             }
//                         })}</p>
//                         <p>${order.amount}.00</p>
//                         <p>Items: {order.items.length}</p>
//                         <p><span>&#x25cf;</span><b>{order.status}</b></p>
//                         <button onClick={fetchOrders}>Track Order</button>
//                     </div>
//                 )
//             })}
//         </div>


//     </div>
//   )
// }

// export default MyOrders


import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { token } }
            );
            console.log("Fetched orders:", response.data); // Log API response

            // Check if data.data is an array and contains orders
            if (Array.isArray(response.data.data)) {
                setData(response.data.data);
            } else {
                console.error("Unexpected data structure:", response.data);
                setData([]); // Set empty data if structure is incorrect
            }
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                            <p>
                                {Array.isArray(order.items) && order.items.length > 0 ? (
                                    order.items.map((item, idx) => {
                                        const itemText = `${item.name} x ${item.quantity}`;
                                        return idx === order.items.length - 1
                                            ? itemText
                                            : `${itemText}, `;
                                    })
                                ) : (
                                    "No items in this order."
                                )}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items ? order.items.length : 0}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
