const Products = () => {
  const products = [
    {
      name: 'balansiaga',
      price: 3.50,
      date: '18.12.2020',
    },
    {
      name: 'burger',
      price: 14.88,
      date: '18.12.2020',
    },
    {
      name: 'shampun',
      price: 6.12,
      date: '18.12.2020',
    },
  ];

  return (
    products.map((product) => {
      return (
        <div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.date}</div>
        </div>
      )
    })
  )
};

export default Products;
