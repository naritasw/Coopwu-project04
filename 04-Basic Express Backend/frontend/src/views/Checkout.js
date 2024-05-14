import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { LinearProgress, Card, IconButton, Button, CardContent, Typography, CardMedia, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Product() {
    const { id } = useParams();
    const [isReady, setIsReady] = useState(false);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/product/${id}?populateImage=true`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
                setIsReady(true);
            })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
                setIsReady(true);
            });
    }, [id]);

    const handleIncrement = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, product.stock));
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    if (!isReady) {
        return <LinearProgress />;
    }



    return (
        <div style={{ padding: '20px' }}>
            <Card key={product._id} className="w-full" style={{ marginBottom: '20px' }}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <CardMedia
                            component="img"
                            image={product.image?.url}
                            alt={product.productname}
                            sx={{ height: 'auto', width: '50%', margin: 'auto' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CardContent>
                            <Typography fontWeight="bold">
                                {product.productname}
                            </Typography>
                            <Typography>
                                รายละเอียด: {product.description}
                            </Typography>
                            <Typography>
                                หมวดหมู่: {product.category}
                            </Typography>
                            <Typography>
                                ราคา: {product.price} บาท
                            </Typography>
                            <Typography>
                                คลัง: {product.stock} ชิ้น
                            </Typography>
                            <Grid container alignItems="center" wrap="nowrap">
                                <Typography component="span">
                                    จำนวน:
                                </Typography>
                                <Button onClick={handleDecrement} aria-label="RemoveIcon" disabled={quantity <= 1}>
                                    <RemoveIcon />
                                </Button>
                                <Typography component="span" sx={{ marginX: 2, minWidth: 40, textAlign: 'center' }}>
                                    {quantity}
                                </Typography>
                                <Button onClick={handleIncrement} aria-label="AddIcon">
                                    <AddIcon />
                                </Button>
                            </Grid>
                            <Button style={{ backgroundColor: 'orange', color: 'white' }}> เพิ่มไปยังรถเข็น </Button>
                            <Button style={{ backgroundColor: 'red', color: 'white' }}> ซื้อสินค้า </Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}

export default Product;
