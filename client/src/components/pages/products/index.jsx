import history from '../../../utils/history';
import { Table, Image, Button, Row, Empty, Switch, Card, Col, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { productFetch, productDelete } from '../../../redux/actions/product';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Products = () => {
  const [productState, setProducts] = useState([]);
  const [outputModeStat, setOutputMode] = useState(true);
  const { products, pagination } = useSelector(state => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productFetch());
    setProducts(products);
  }, products)

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
          <Button type="primary"
          onClick={() => goTo(record._id)}
          >
            Edite
          </Button>
          <Button 
            style={{marginLeft:"20px"}}
            type="primary"
            danger
            onClick={() => onDelete(record._id)}
          >
            Delete
          </Button>
        </>
        )
      }
    
    },
  ];

  const onDelete = (id) => {
    console.log(id)
    dispatch(productDelete(id));
  }

  const goTo = (id) => {
    history.push(`/products/${id}`)
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
      <Link to="/products/create">
        <Button type="primary">
          New product 
        </Button>
      </Link>
      <span>Card</span>
      <Switch defaultChecked onChange={toggleOutputMode} />
      <span>Table</span>
    </Row>

    { 
      (products.length && outputModeStat) &&
        <Row>
          <Table
            style={tableStyle}
            columns={columns}
            dataSource={products}
          />
        </Row>
    }

    {
      (products.length && !outputModeStat) &&
        <Row gutter={[24, 24]}>
          {
            products.map((product, index) => {
              return (
                <Col  span={6}>
                  <Card 
                    span={6}
                    style={{ width: 275 }}
                    cover={
                      <img
                        alt="example"
                        src={product.image}
                        style={{ height:200, objectFit: 'fit-content' }}
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
                </Col>
              )
            })
          }
        </Row>
    }

    {
      !products.length &&
        <Row>
          <Empty style={emptyStyle} />
        </Row>
    }
    </>
  )
};

export default Products;