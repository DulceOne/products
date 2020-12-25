import {
  Form,
  Input,
  Button,
  Upload,
  PageHeader,
  Row,
  Image,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { productGetById, productEdit } from '../../../../../redux/actions/product';

const ProductEditComponent = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const [image, setImage] = useState('');
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });

  useEffect(() => {
    const { productId } = props.match.params;
    dispatch(productGetById(productId));
  }, []);

  useEffect(() => {
    form.setFieldsValue({ name: product.name, price: product.price });
    setImage(product.image);
  }, [product]);

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (imageUrl) => {
      setImage(imageUrl);
    });
  };

  const onUpdate = (value) => {
    const body = new FormData();
    body.append('name', value.name);
    body.append('price', value.price);
    if (value.image) {
      body.append('image', value.image.fileList[0].originFileObj);
    }
    dispatch(productEdit(body, product._id));
  };

  return (
    <>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Product edit"
      />
      <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Form
          form={form}
          style={{ marginTop: '30px', width: '70%' }}
          onFinish={onUpdate}
          span={8}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                pattern: /^[0-9]/,
                message: 'Please input your price!',
              },
            ]}
          >
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload onChange={handleChange}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Image
            width={200}
            src={image}
            style={{ display: isDesktopOrLaptop ? 'none' : 'block' }}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginTop: isDesktopOrLaptop ? 0 : 20 }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Image
          width={200}
          src={image}
          style={{ display: isDesktopOrLaptop ? 'block' : 'none' }}
        />
      </Row>
    </>
  );
};

ProductEditComponent.propTypes = {
  match: PropTypes.shape({ params: PropTypes.arrayOf }),
};

ProductEditComponent.defaultProps = {
  match: {
    params: [],
  },
};

export default ProductEditComponent;
