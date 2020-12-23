import history from '../../../utils/history';
import { Table, Image, Button, Row, Empty, Card, Col, PageHeader, Radio, Pagination } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { productFetch, productDelete } from '../../../redux/actions/product';
import { EditOutlined, DeleteOutlined  } from '@ant-design/icons';
import { Link, useRouteMatch  } from 'react-router-dom';
import queryString from 'query-string';
const Products = (props) => {
  const [templateOption, setTemplateOption] = useState(true);
  const { products, pagination } = useSelector(state => state.product);
  const [ page, setPage ] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const { search } = props.location;
    const { page } = queryString.parse(search);
    setPage(page || 1);
    dispatch(productFetch(page || 1));
  }, [])


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: 'image',
      render: (text, record) =>  {
        return (
          <Image
          width={75}
          height={75}
          src={isImage(record.image)}
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
    margin: "auto",
    marginTop: 200
  }

  const toggleOutputMode = (event) => {
    setTemplateOption(event.target.value);
  }

  const isImage = (image) => {
    const fallback="https://img.icons8.com/pastel-glyph/344/image--v2.png";
    return image ? image : fallback;
  }

  const onPaginate = (page) => {
    dispatch(productFetch(page));
    history.push(`?page=${page}`);
  }

  const templateOptions = [
    { label: 'Table', value: true },
    { label: 'Card', value: false },
  ];

  return (
    <>

    
  <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="Product list"
      extra={[
        <Link to="/products/create">
        <Button type="primary">
          New product 
        </Button>
      </Link>,
        <Radio.Group
          options={templateOptions}
          onChange={toggleOutputMode}
          value={templateOption}
          optionType="button"
          buttonStyle="solid"
        />
      ]}
    >
    </PageHeader>

    { 
      (products.length > 0 && templateOption) &&
        <Row style={{marginTop: "30px"}}>
          <Table
            style={tableStyle}
            columns={columns}
            dataSource={products}
            pagination={false}
          />
        </Row>
    }

    {
      (products.length > 0 && !templateOption) &&
        <Row gutter={[24, 24]} style={{marginTop: "18px"}}>
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
                        src={isImage(product.image)}
                        style={{ height:200, objectFit: 'cover' }}
                      />
                    }
                    actions={[
                      <EditOutlined key="edit" onClick={() => goTo(product._id)} />,
                      <DeleteOutlined key="delete" onClick={() => onDelete(product._id)} />,
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

    {
      products.length > 0 &&
      <Pagination
        onChange={onPaginate} 
        defaultCurrent={page}
        style={{marginTop: 30}}
        total={pagination.collections}
      />
    }
    </>
  )
};

export default Products;