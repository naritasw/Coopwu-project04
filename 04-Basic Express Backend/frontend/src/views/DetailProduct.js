import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Grid,
    CardContent,
    Typography,
    LinearProgress,
    IconButton,
    InputAdornment,
    Input,
    CardMedia,
    CardActions,
    Badge,
    Button
} from "@mui/material";
import _ from 'lodash';
import axios from "axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';

function DetailProduct() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [cart, setCart] = useState([]);
    const [rerender, setRerender] = useState(false);

    const getAllProduct = () => {
        setIsReady(false);
        axios
            .get(`${process.env.REACT_APP_API_URL}/product`)
            .then((res) => {
                setProducts(res?.data?.rows);
                setIsReady(true);
                console.log("Product ", res?.data?.rows);
            })
            .catch((error) => {
                console.error("Error", error?.message);
            });
    };

    console.log("cart", cart);

    useEffect(() => {
        getAllProduct();
        const savedCart = JSON.parse(localStorage.getItem("cart"));
        if (savedCart) {
            setCart(savedCart);
        }
    }, [rerender]);

    const addToCart = (product) => {
        if (product.stock <= 0) {
            alert('สินค้าหมด');
            return;
        }

        const selectedProduct = _.find(cart, item => item.product._id === product._id);
        const selectedProductIndex = _.findIndex(cart, item => item.product._id === product._id);
        if (selectedProduct) {
            selectedProduct.quantity = selectedProduct.quantity + 1;
            cart[selectedProductIndex] = selectedProduct;
        } else {
            cart.push({ product: product, quantity: 1 });
        }

        setCart([cart]);
        localStorage.setItem("cart", JSON.stringify(cart));
        setRerender(!rerender);
    };

    if (!isReady) {
        return (
            <div>
                <LinearProgress />
            </div>
        );
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
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            ค้นหา : <span className='text-blue-500'>{searchTerm}</span>
                        </div>
                        <div>
                            {/* <TablePagination
                                component="div"
                                count={100}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /> */}
                            {/* <Pagination count={10} /> */}
                        </div>
                    </div>
                    <br />
                    <Grid container spacing={0.5}>
                        {products.filter(product => product.productname.toLowerCase().includes(searchTerm.toLowerCase())).map((product, index) => (
                            <Grid item key={index} xs={6} sm={3} md={2} lg={2} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Card key={index} style={{ width: '100%', height: '100%', borderRadius: '0px' }}>
                                    <Link to={`/Checkout/${product?._id}`}>
                                        <CardMedia
                                            component="img"
                                            image={product?.image?.url}
                                            alt={product.productname}
                                            style={{ height: '50%' }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" noWrap>
                                                {product.productname}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" noWrap>
                                                ฿ {product.price} บาท
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                    <CardActions style={{ justifyContent: 'space-between' }}>
                                        {product.stock > 0 ? (
                                            <IconButton
                                                aria-label="Add to Cart"
                                                onClick={() => addToCart(product)}
                                            >
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                        ) : (
                                            <Button disabled style={{ color: 'red' }}>
                                                สินค้าหมด
                                            </Button>
                                        )}
                                        <Link to={`/Product/edit/${product?._id}`}>
                                            <IconButton aria-label="Edit">
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
