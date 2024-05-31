import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import {
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    CardMedia,
    Input
} from "@mui/material";

function Order() {
    const location = useLocation();
    const { selectedItems } = location.state || { selectedItems: [] };
    const [cart, setCart] = useState(selectedItems);
    const { control, handleSubmit } = useForm();

    const updateProductStock = (updatedCart) => {
        updatedCart.forEach(item => {
            const { product, quantity } = item;
            axios
                .put(`${process.env.REACT_APP_API_URL}/product/${product._id}`, { stock: product.stock })
                .then(response => {
                    console.log(`Updated stock for product ${product.productname}`);
                })
                .catch(error => {
                    console.error(`Error updating stock for product ${product.productname}:`, error);
                });
        });
    };
    const handlePurchase = (data) => {
        const { customer_name, tel, address } = data;

        if (!customer_name) {
            alert('กรุณาใส่ชื่อผู้ซื้อ');
            return;
        }
        if (!tel) {
            alert('กรุณาใส่เบอร์โทรศัพท์');
            return;
        }
        if (!address) {
            alert('กรุณาใส่ที่อยู่');
            return;
        }

        const updatedCart = cart.map(item => {
            const updatedItem = { ...item };
            updatedItem.product.stock = Math.max(updatedItem.product.stock - item.quantity, 0);
            return updatedItem;
        });

        const orderData = {
            products: updatedCart.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            customer_name,
            tel,
            address,
            date: new Date(),
        };

        axios
            .post(`${process.env.REACT_APP_API_URL}/order`, orderData)
            .then((response) => {
                alert('สำเร็จ');
                setCart([]);
                localStorage.removeItem("cart");

                const buyerHistory = JSON.parse(localStorage.getItem("buyerHistory")) || [];
                const newBuyerEntry = {
                    name: customer_name,
                    tel: tel,
                    address: address,
                    date: new Date(),
                    order: updatedCart
                };
                buyerHistory.push(newBuyerEntry);
                localStorage.setItem("buyerHistory", JSON.stringify(buyerHistory));

                console.log("Buyer history saved to localStorage:", buyerHistory);

                updateProductStock(updatedCart);
                console.log("Order placed successfully. Updated cart:", updatedCart);
            })
            .catch((err) => {
                alert(`Error: ${err.response?.data?.message || err.message}`);
                console.log("Error placing order:", err);
            });
    };
    const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='flex justify-center flex-wrap'>
                <div className='lg:w-3/4 w-full'>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                รายการสั่งซื้อ
                            </Typography>
                            {cart.length === 0 ? (
                                <Typography variant="body1">
                                    ไม่มีสินค้าในรายการสั่งซื้อ
                                </Typography>
                            ) : (
                                cart.map((item, index) => (
                                    <Card key={index} style={{ marginBottom: '10px' }}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={2}>
                                                <CardMedia
                                                    component="img"
                                                    image={item.product.image.url}
                                                    alt={item.product.productname}
                                                    style={{ height: 100, width: 100 }}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <CardContent>
                                                    <Typography variant="h6">
                                                        {item.product.productname}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        จำนวน: {item.quantity}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        ราคา: {item.product.price * item.quantity} บาท
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))
                            )}
                            <Typography variant="h6" style={{ marginTop: '20px' }}>
                                ราคารวม: {totalPrice} บาท
                            </Typography>
                            <Controller
                                control={control}
                                name="customer_name"
                                render={({ field }) => <Input {...field} placeholder="ชื่อลูกค้า" fullWidth style={{ margin: '20px 0' }} />}
                            />
                            <Controller
                                control={control}
                                name="tel"
                                render={({ field }) => <Input {...field} placeholder="เบอร์โทรศัพท์" fullWidth style={{ margin: '20px 0' }} />}
                            />
                            <Controller
                                control={control}
                                name="address"
                                render={({ field }) => <Input {...field} placeholder="ที่อยู่" fullWidth style={{ margin: '20px 0' }} />}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(handlePurchase)}
                            >
                                สั่งซื้อ
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Order;