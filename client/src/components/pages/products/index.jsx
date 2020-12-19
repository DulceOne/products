import history from '../../../utils/history';
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

  const goTo = () => {
    history.push('/products/1')
  }

  return (
    products.map((product) => {
      return (
        <div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.date}</div>
          <button onClick={goTo}></button>
        </div>
      )
    })
  )
};

export default Products;
