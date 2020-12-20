import history from '../../../utils/history';
import { Table, Image, Button, Row, Empty, Switch, Card, Avatar   } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { productFetch } from '../../../redux/actions/product';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';

const Products = () => {
  const [productState, setProducts] = useState([]);
  const [outputModeStat, setOutputMode] = useState(true);
  const { products, pagination } = useSelector(state => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productFetch());
    setProducts(products);
  }, [products])

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: 'image',
      render: (text, record) =>  {
        const src = record.image || 'error';
        return (
          <Image
          width={75}
          height={75}
          src={src}
          fallback="https://img.icons8.com/pastel-glyph/344/image--v2.png"
        />
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => {
        return(
          <>
          <Button type="primary">
            Edite
          </Button>
          <Button style={{marginLeft:"20px"}} type="primary" danger>
            Delete
          </Button>
        </>
        )
      }
    
    },
  ];

  const goTo = () => {
    history.push('/products/1')
  }

  const tableStyle = {
    width: "100%"
  }

  const emptyStyle = {
    marginTop: "20%"
  }

  const toggleOutputMode = (event) => {
    setOutputMode(event);
  }

  return (
    <>
      <Row>
          <Button type="primary">
            New product 
          </Button>
          <span>Card</span>
          <Switch defaultChecked onChange={toggleOutputMode} />
          <span>Table</span>
      </Row>
      <Row>
        {
        products.length ?
        ( 
          outputModeStat ?
          <Table
            style={tableStyle}
            columns={columns}
            dataSource={products}
          />
          :
          products.map((product, index) => {
            return (
              <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={product.image}
                />
              }
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Card.Meta
                title={product.name}
                description={product.date}
              />
              <b style={{fontSize: "30px"}}>{product.price + '$'}</b>
            </Card>
            )
          })
         )
        :
        <Empty style={emptyStyle} />
        }
      </Row>
    </>
  )
};

export default Products;
