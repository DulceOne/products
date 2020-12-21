import { Form, Input, Button, Upload, PageHeader } from 'antd';
import ProductCreateComponent from '../product_create';


const ProductEditComponent = () => {
    return (
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Product edit"
        >
        </PageHeader>
    )
}


export default ProductEditComponent;
