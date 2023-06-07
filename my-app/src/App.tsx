import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Product {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^A-Za-z]/g, '');
    setName(inputValue);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^A-Za-z ]/g, '');
    setDescription(inputValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    const newPrice = inputValue !== '' ? Number(inputValue) : 0;
    setPrice(newPrice);
  };

  const handleAddProduct = () => {
    const newProduct: Product = { name, description, price, quantity: 1 };
    setProducts([...products, newProduct]);
    setName('');
    setDescription('');
    setPrice(0);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleIncrementQuantity = (index: number) => {
    setProducts(prevProducts =>
      prevProducts.map((product, i) => {
        if (i === index) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      })
    );
  };

  const handleDecrementQuantity = (index: number) => {
    setProducts(prevProducts =>
      prevProducts.map((product, i) => {
        if (i === index && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
    );
  };

  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

  const isAddButtonDisabled = name === '' || price === 0;

  return (
    <Box sx={{ backgroundColor: '#3866ee', display: 'flex', gap: '200px', marginTop: '0px', height: '100vh', width: '100vw', position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, }}>
      <Box sx={{ backgroundColor: '#e0dfa0', width: '50%', marginTop: '70px', display: 'inline-block', padding: '10px', borderRadius: '4px',marginLeft: '70px', marginBottom: '70px'}}>
        <Typography variant="h5"sx={{ mb: '70px', textAlign: 'center' }}>Agregar Producto</Typography>
        <TextField label="Nombre" value={name} onChange={handleNameChange} fullWidth sx={{ mb: '30px' }} />
        <TextField label="Descripción" value={description} onChange={handleDescriptionChange} fullWidth sx={{ mb: '30px' }} />
        <TextField type="number" label="Precio" value={price === 0 ? '' : price} onChange={handlePriceChange} fullWidth sx={{ mb: '30px' }} />
        <Button variant="contained" onClick={handleAddProduct} disabled={isAddButtonDisabled} sx={{ width: '100%', height: '50px', mt: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Agregar
      </Button>
      </Box>
      <Box sx={{ backgroundColor: '#b1d649', width: '50%', marginTop: '70px', display: 'inline-block', padding: '10px', borderRadius: '4px', marginRight: '70px', marginBottom: '70px', overflow: 'auto' }}>
        <Typography variant="h5" sx={{ mb: '70px', textAlign: 'center', marginTop: '-0px' }}>Carrito</Typography>
        {products.length === 0 ? (
          <Typography variant="h5" sx={{ mb: '70px', textAlign: 'center' }}>No hay productos en el carrito</Typography>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
            {products.map((product, index) => (
              <div key={index} style={{ backgroundColor: '#84d89d', border: '1px solid #000000', padding: '10px', marginBottom: '10px', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1">{product.name}</Typography>
                {product.description && <Typography variant="body2">{product.description}</Typography>}
                <Typography variant="body1">Precio: ${product.price}</Typography>
                <Typography variant="body1">Cantidad: {product.quantity}</Typography>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="outlined" onClick={() => handleIncrementQuantity(index)}>+</Button>
                  <Button variant="outlined" onClick={() => handleDecrementQuantity(index)}>-</Button>
                  <Button variant="outlined" onClick={() => handleRemoveProduct(index)}>Eliminar</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Box>
          <Typography variant="h6" sx={{ backgroundColor: '#beaf28', textAlign: 'right', position: 'fixed', top: '20px', right: '20px', marginTop: '20px', marginRight: '70px', display: 'inline-block', padding: '10px', borderRadius: '4px' }}>
            Precio total: ${totalPrice}
          </Typography>
        </Box>
      </Box>
      <img src="C:\Users\FabiSz\Desktop\react-vite-TS\my-app\carrito.png"  alt="Imagen" style={{ position: 'absolute', top: '40px', right: '40px', width: '50px', height: '50px'}} />
    </Box>
  );
};

export default App