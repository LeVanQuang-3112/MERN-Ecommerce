import * as React from 'react';
import axios from "axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import PaypalButton from './PaypalButton';
import Grid from '@mui/material/Grid';

export default function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [callback, setCallback] = state.userAPI.callback
    const [total, setTotal] = useState(0)
    console.log(cart)

    useEffect(() => {
        const totalCost = () => {
            let total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)
            setTotal(total)
        }
        totalCost()
    }, [cart])
    
    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {
          headers: {Authorization: token}
        })
      }
    
    const increment = (id) => {
        cart.forEach((item) => {
            if(item._id === id) {
                item.quantity+=1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach((item) => {
            if(item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity-=1;
            }
        })
        setCart([...cart])
        addToCart(cart)
    }
    
    const removeProduct = (id) => {
        if (window.confirm("Do you want to delete this product?")) {
          cart.forEach((item, index) => {
            if (item._id === id) {
              cart.splice(index, 1)
            }
          })
          setCart([...cart])
          addToCart(cart)
        }
      }

    
    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment
        await axios.post(`http://localhost:5000/api/payment`, {cart, paymentID, address}, {
            headers: {Authorization: token}
        })
        setCart([])
        addToCart([])
        Swal.fire("Success!", "Thanks so much because buy items", "success")
        setCallback(!callback)
    }

  return (
      <div className="main">
      <div className="container">
      <div className="cart__container">

          <h1 className="page__header">Cart</h1>
          {
              cart.length > 0 
              ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table__item">Name</TableCell>
                                <TableCell className="table__item" align="left">Image</TableCell>
                                <TableCell className="table__item">Category</TableCell>
                                <TableCell className="table__item">Price</TableCell>
                                <TableCell className="table__item">Quantity</TableCell>
                                <TableCell className="table__item" align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {cart.map((item) => (
                            <TableRow
                            key={item._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {
                                    item.title.length > 40
                                    ? (
                                    <TableCell className="table__item" component="th" scope="row">{item.title.substring(0, 40)}...</TableCell>
                                    )
                                    : <TableCell className="table__item" component="th" scope="row">{item.title}</TableCell>
                                }
                            
                            <TableCell className="table__item">
                                <img src={item.images.url} alt={item.title} className="cart__image"/>
                            </TableCell>
                            <TableCell className="table__item">{item.category}</TableCell>
                            <TableCell className="table__item">${item.price}</TableCell>
                            <TableCell className="table__item">
                                <div style={{display: "flex", alignItems: "center"}}>

                                <button className="table__cart--button" onClick={() => decrement(item._id)}>-</button>
                                &nbsp;
                                {item.quantity}
                                &nbsp;
                                <button className="table__cart--button" onClick={() => increment(item._id)}>+</button>
                                </div>
                                </TableCell>
                            <TableCell className="table__item" align="right">
                                <Button className="cart__remove--btn" variant="contained" color="success" onClick={() => removeProduct(item._id)}>Remove</Button>
                            </TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell className="table__item" colSpan={2}>Total</TableCell>
                            <TableCell className="table__item total__price" align="right"><strong>${Math.round(total*1000)/1000}</strong></TableCell>
                            <TableCell className="table__item" align="right"></TableCell>
                            <TableCell className="table__item" align="right"></TableCell>
                            <TableCell className="table__item" align="right">
                                <PaypalButton total={total} tranSuccess={tranSuccess} className="paypal__button"/>
                            </TableCell>
                        </TableRow>

                        </TableBody>
                    </Table>
                    </TableContainer>
              )
              : (
                       <Grid item xs={12} md={12} lg={12}>
              <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 300
              }}>
                  <h2>No Cart Item</h2>
                  </Paper>
                  </Grid> 
              )
          }
        
      </div>
      </div>
      </div>
  );
}