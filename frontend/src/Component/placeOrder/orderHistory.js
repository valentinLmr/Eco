import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { listOrderMine } from '../../backend/Actions/orderActions';
import {LoadingBox} from '../Helper/LoadingBox'
import {MessageBox} from '../Helper/MessageBox'
import './orderHistory.css'


const OrderHistory = (props) => {
    const orderMineList = useSelector((state => state.orderMineList))

    const {loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch])

    return(
    <div>
        <h3> Order History</h3>
        {loading ? <LoadingBox></LoadingBox> : 
        error ?  <MessageBox></MessageBox>
        :
        (
            <table className= 'table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
            <tbody>
                {orders.map((order)=> 
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not paid'}</td>
                        <td>{order.isDelivered ? order.DeliveredAt.substring(0, 10) : 'Not yet'}</td>
                        <td>
                            <button type='button' className='small' onClick={() => props.history.push(`/orders/${order._id}`)}>
                                Details
                            </button>
                        </td>

                    </tr>
                )}
            </tbody>
            </table>
        )
        }
    </div>)
}

export default OrderHistory