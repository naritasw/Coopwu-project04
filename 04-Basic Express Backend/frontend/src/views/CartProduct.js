import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Button,
    CardActions,
    IconButton,
    Grid,
    CardMedia,
    Checkbox,
    FormControlLabel,
    Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function CartProduct({ cart, setCart }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, [setCart]);

    useEffect(() => {
        const price = selectedItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
        setTotalPrice(price);
    }, [selectedItems, cart]);

    const handleRemoveFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        updateLocalStorage(newCart);
    };

    const handleIncrement = (index) => {
        const newCart = [...cart];
        newCart[index].quantity = Math.min(newCart[index].quantity + 1, newCart[index].product.stock);
        setCart(newCart);
        updateLocalStorage(newCart);
        if (selectedItems.indexOf(newCart[index]) !== -1) {
            const updatedSelectedItems = [...selectedItems];
            setSelectedItems(updatedSelectedItems);
        }
    };

    const handleDecrement = (index) => {
        const newCart = [...cart];
        newCart[index].quantity = Math.max(newCart[index].quantity - 1, 1);
        setCart(newCart);
        updateLocalStorage(newCart);
        if (selectedItems.indexOf(newCart[index]) !== -1) {
            const updatedSelectedItems = [...selectedItems];
            setSelectedItems(updatedSelectedItems);
        }
    };

    const handleSelectItem = (index) => {
        const selectedIndex = selectedItems.indexOf(cart[index]);
        let newSelectedItems = [];

        if (selectedIndex === -1) {
            newSelectedItems = newSelectedItems.concat(selectedItems, cart[index]);
        } else if (selectedIndex === 0) {
            newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
        } else if (selectedIndex === selectedItems.length - 1) {
            newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedItems = newSelectedItems.concat(
                selectedItems.slice(0, selectedIndex),
                selectedItems.slice(selectedIndex + 1),
            );
        }

        setSelectedItems(newSelectedItems);
    };

    const updateLocalStorage = (newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const handleCheckout = () => {
        navigate('/Order', { state: { selectedItems } });
    };

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='flex justify-center flex-wrap'>
                <div className='lg:w-3/4 w-full'>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                สินค้าในตะกร้า
                            </Typography>
                            {cart.length === 0 ? (
                                <Typography variant="body1">
                                    ไม่มีสินค้าในตะกร้า
                                </Typography>
                            ) : (
                                cart.map((item, index) => (
                                    <Card key={index} style={{ marginBottom: '10px' }}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={1}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={selectedItems.indexOf(item) !== -1}
                                                            onChange={() => handleSelectItem(index)}
                                                        />
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <CardMedia
                                                    component="img"
                                                    image={item.product.image.url}
                                                    alt={item.product.productname}
                                                    style={{ height: 100, width: 100 }}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <CardContent>
                                                    <Typography variant="h6">
                                                        {item.product.productname}
                                                    </Typography>
                                                    <Grid container alignItems="center" wrap="nowrap">
                                                        <Typography component="span">
                                                            จำนวน:
                                                        </Typography>
                                                        <Button onClick={() => handleDecrement(index)} aria-label="RemoveIcon" disabled={item.quantity <= 1}>
                                                            <RemoveIcon />
                                                        </Button>
                                                        <Typography component="span" sx={{ marginX: 2, minWidth: 40, textAlign: 'center' }}>
                                                            {item.quantity}
                                                        </Typography>
                                                        <Button onClick={() => handleIncrement(index)} aria-label="AddIcon">
                                                            <AddIcon />
                                                        </Button>
                                                    </Grid>
                                                    <Typography variant="body2">
                                                        ราคา: {item.product.price * item.quantity} บาท
                                                    </Typography>
                                                </CardContent>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <CardActions>
                                                    <IconButton
                                                        aria-label="ลบ"
                                                        onClick={() => handleRemoveFromCart(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </CardActions>
                                            </Grid>
                                        </Grid>
                                    </Card>
                                ))
                            )}
                            <Box display="flex" justifyContent="flex-end" alignItems="center" marginTop="10px">
                                <Typography variant="h6" marginRight="20px">
                                    ราคารวม: {totalPrice} บาท
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={selectedItems.length === 0}
                                    onClick={handleCheckout}
                                >
                                    ชำระเงิน
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CartProduct;
