import {
  Table,
  Image,
  Button,
  Row,
  Empty,
  Card,
  Col,
  PageHeader,
  Radio,
  Pagination,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { productFetch, productDelete } from '../../../redux/actions/product';
import history from '../../../utils/history';

const Products = (props) => {
  const [templateOption, setTemplateOption] = useState(true);
  const { products, pagination } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });

  useEffect(() => {
    const { search } = props.location;
    const getPage = queryString.parse(search).page;
    setPage(page || 1);
    setTemplateOption(isDesktopOrLaptop);
    dispatch(productFetch(getPage || 1));
  }, []);

  const onDelete = (id) => {
    dispatch(productDelete(id));
  };

  const isImage = (image) => {
    const fallback = 'https://img.icons8.com/pastel-glyph/344/image--v2.png';
    return image || fallback;
  };

  const goTo = (id) => {
    history.push(`/products/${id}`);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <Image
          width={75}
          height={75}
          src={isImage(record.image)}
        />
      ),
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
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => goTo(record._id)}
          >
            Edite
          </Button>
          <Button
            style={{ marginLeft: '20px' }}
            type="primary"
            danger
            onClick={() => onDelete(record._id)}
          >
            Delete
          </Button>
        </>
      ),

    },
  ];

  const tableStyle = {
    width: '100%',
  };

  const emptyStyle = {
    margin: 'auto',
    marginTop: 200,
  };

  const toggleOutputMode = (event) => {
    setTemplateOption(event.target.value);
  };

  const onPaginate = (value) => {
    dispatch(productFetch(value));
    history.push(`?page=${value}`);
  };

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
        subTitle={isDesktopOrLaptop}
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
            style={{ display: isDesktopOrLaptop ? 'inline' : 'none' }}
          />,
        ]}
      />

      {
        (products.length > 0 && templateOption)
        && (
        <Row style={{ marginTop: '30px' }}>
          <Table
            style={tableStyle}
            columns={columns}
            dataSource={products}
            pagination={false}
          />
        </Row>
        )
      }

      {
        (products.length > 0 && !templateOption)
        && (
        <Row gutter={[24, 24]} style={{ marginTop: '18px' }}>
          {
            products.map((product) => (
              <Col span={isDesktopOrLaptop ? 6 : 24}>
                <Card
                  span={isDesktopOrLaptop ? 6 : 24}
                  style={{ width: isDesktopOrLaptop ? 275 : '100%' }}
                  cover={(
                    <img
                      alt="example"
                      src={isImage(product.image)}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                    )}
                  actions={[
                    <EditOutlined key="edit" onClick={() => goTo(product._id)} />,
                    <DeleteOutlined key="delete" onClick={() => onDelete(product._id)} />,
                  ]}
                >
                  <Card.Meta
                    title={product.name}
                    description={product.date}
                  />
                  <b style={{ fontSize: '30px' }}>{`${product.price}$`}</b>
                </Card>
              </Col>
            ))
          }
        </Row>
        )
      }

      {
        !products.length
        && (
        <Row>
          <Empty style={emptyStyle} />
        </Row>
        )
      }

      {
        products.length > 0
        && (
        <Pagination
          onChange={onPaginate}
          defaultCurrent={page}
          style={{ marginTop: 30 }}
          total={pagination.collections}
        />
        )
      }
    </>
  );
};

Products.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }),
};

Products.defaultProps = {
  location: {
    search: '',
  },
};

export default Products;
