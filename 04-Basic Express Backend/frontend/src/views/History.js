import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";

function BuyerHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const buyerHistory = JSON.parse(localStorage.getItem("buyerHistory")) || [];
        setHistory(buyerHistory);
    }, []);

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='flex justify-center flex-wrap'>
                <div className='lg:w-3/4 w-full'>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                ประวัติการสั่งซื้อ
                            </Typography>
                            {history.length === 0 ? (
                                <Typography variant="body1">
                                    ไม่มีประวัติการสั่งซื้อ
                                </Typography>
                            ) : (
                                history.map((order, index) => (
                                    <Card key={index} style={{ marginBottom: '10px' }}>
                                        <CardContent>
                                            <Typography variant="h6">
                                                ชื่อผู้ซื้อ: {order.buyerName}
                                            </Typography>
                                            <Typography variant="body2">
                                                วันที่: {new Date(order.date).toLocaleDateString()}
                                            </Typography>
                                            {order.products.map((item, idx) => (
                                                <Grid container key={idx} alignItems="center">
                                                    <Grid item xs={2}>
                                                        <Typography variant="body2">
                                                            {item.product.productname}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Typography variant="body2">
                                                            จำนวน: {item.quantity}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Typography variant="body2">
                                                            ราคา: {item.product.price * item.quantity} บาท
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BuyerHistory;
