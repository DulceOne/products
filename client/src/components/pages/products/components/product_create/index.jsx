import { Form, Input, Button, Upload, PageHeader } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react';
import { productAdd } from '../../../../../redux/actions/product';
const ProductCreateComponent = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [formState, setFormState] = useState({name: '', price: ''})
	const onCreate = value => {
		console.log(value)
		const product = new FormData();
		product.append('name', value.name);
		product.append('price', value.price);
		if(value.image) {
			product.append('image', value.image.fileList[0].originFileObj);
		}
		setFormState({name: '', price: ''})
		dispatch(productAdd(product))
	}

	return (
		<>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title="Product create"
			>
			</PageHeader>
			<Form
				form={form}
				onFinish={onCreate}
				initialValues={formState}
				style={{marginTop: "30px"}}
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
					<Upload >
						<Button icon={<UploadOutlined />}>Select File</Button>
					</Upload>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">Submit</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default ProductCreateComponent;