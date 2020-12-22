import { Form, Input, Button, Upload, PageHeader, message, Row, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { productGetById, productEdit } from '../../../../../redux/actions/product';

const ProductEditComponent = (props) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { product } = useSelector(state => state.product);
  const [image, setImage] = useState('');
  useEffect(() => {
    const { productId } = props.match.params;
    dispatch(productGetById(productId));
  }, [])

  useEffect(() => {
    console.log(product)
    form.setFieldsValue({name: product.name, price: product.price});
    setImage(product.image);
  }, [product])

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = info => {
        getBase64(info.file.originFileObj, imageUrl => {
            setImage(imageUrl)
        });
    }

    const onUpdate = (value) => {
        const body = new FormData();
		body.append('name', value.name);
        body.append('price', value.price);
		if(value.image) {
			body.append('image', value.image.fileList[0].originFileObj);
		}
        dispatch(productEdit(body, product._id));
    }

  return (
      <>
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Product edit"
        >
        </PageHeader>
        <Row style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
            <Form
            form={form}
            style={{marginTop: "30px", width: "70%"}}
            onFinish={onUpdate}
            span={8}
            >
            <Form.Item label="Name" name="name"
            rules={[
                {
                required: true,
                message: 'Please input your name!',
                },
            ]}  
            >
                <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Price" name="price"
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
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
            </Form>
            <Image
                width={200}
                src={image}
            />
        </Row>
      </>
    )
}


export default ProductEditComponent;
