import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
    LinearProgress,
    Card,
    IconButton,
    Button,
    CardContent,
    Typography,
    CardMedia,
    Grid,
    Input,
    Badge,
    InputAdornment,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';

function Product() {
    const [searchTerm, setSearchTerm] = useState("");
    const { id } = useParams();
    const [isReady, setIsReady] = useState(false);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/product/${id}?populateImage=true`)
            .then((res) => {
                setProduct(res.data);
                setIsReady(true);
            })
            .catch((error) => {
                console.error('Failed to fetch data:', error);
                setIsReady(true);
            });

        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, [id]);

    const handleIncrement = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, product.stock));
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleAddToCart = () => {
        const existingProduct = cart.find(cartItem => cartItem.product._id === product._id);
        if (existingProduct) {
            existingProduct.quantity = Math.min(existingProduct.quantity + quantity, product.stock);
        } else {
            cart.push({ product, quantity });
        }
        setCart([...cart]);
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    if (!isReady) {
        return <LinearProgress />;
    }

    return (
        <div className='min-h-screen bg-gray-100 p-4'>
            <div className='flex justify-center flex-wrap'>
                <div className='lg:w-3/4 w-full'>
                    <Card>
                        <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Input
                                placeholder='Search products...'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 6, marginRight: '8px' }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                            <Link to='/Cart'>
                                <IconButton>
                                    <Badge badgeContent={cart.length} color="primary">
                                        <ShoppingCartOutlinedIcon style={{ color: 'black' }} />
                                    </Badge>
                                </IconButton>
                            </Link>
                        </CardContent>
                    </Card>
                    <div style={{ padding: '20px' }}>
                        <Card key={product._id} className="w-full" style={{ marginBottom: '20px' }}>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <CardMedia
                                        component="img"
                                        image={product.image?.url}
                                        alt={product.productname}
                                        style={{ height: 'auto', width: '50%', margin: 'auto' }}
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
                                        <Grid container alignItems="center" wrap="nowrap" spacing={2}>
                                            <Grid item>
                                                <Typography component="span">
                                                    จำนวน:
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button onClick={handleDecrement} aria-label="RemoveIcon" disabled={quantity <= 1}>
                                                    <RemoveIcon />
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Typography component="span" style={{ marginX: 2, minWidth: 40, textAlign: 'center' }}>
                                                    {quantity}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button onClick={handleIncrement} aria-label="AddIcon">
                                                    <AddIcon />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} style={{ marginTop: '20px' }}>
                                            <Grid item>
                                                <Button
                                                    style={{ backgroundColor: 'orange', color: 'white' }}
                                                    aria-label="Add to Cart"
                                                    onClick={handleAddToCart}
                                                >
                                                    เพิ่มไปยังรถเข็น
                                                </Button>
                                            </Grid>

                                            <Grid item>
                                                <Link to={{ pathname: "/order", state: { selectedItems: cart } }}>
                                                    <Button style={{ backgroundColor: 'red', color: 'white' }}>
                                                        ซื้อสินค้า
                                                    </Button>
                                                </Link>
                                            </Grid>


                                        </Grid>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
