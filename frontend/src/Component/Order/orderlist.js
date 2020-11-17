import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrder } from '../../backend/Actions/orderActions';
import { LoadingBox } from '../Helper/LoadingBox';
import { MessageBox } from '../Helper/MessageBox';

const OrderList = (props) => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList)
    const {error, loading, orders} = orderList
    const orderDelete = useSelector(state => state.orderDelete)
    const {error: errorDelete, loading: loadingDelete, success} = orderDelete
    useEffect(() => {
        dispatch(listOrder());
    }, [dispatch, success])

    const deleteHandler = (order) => {

        if(window.confirm('Are you sure to delete ?')){
            dispatch(deleteOrder(order._id))
            }    }
    return (
        <div>
        <h3> Orders</h3>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant='danger'>{error}</MessageBox>}
        {loading ? <LoadingBox></LoadingBox> : 
        error ?  <MessageBox>{error}</MessageBox>
        :
        (
            <table className= 'table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
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
                        <td>{order.user ? order.user.name : 'old user id'}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not paid'}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Not yet'}</td>
                        <td>
                            <button type='button' className='small' onClick={() => props.history.push(`/orders/${order._id}`)}>
                                Details
                            </button>
                            <button type='button' className='small' onClick={() => deleteHandler(order)}>
                                Delete
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

export default OrderList