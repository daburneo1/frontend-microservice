import { useLocation } from 'react-router-dom';
import OrderDetails from './OrderDetails';

function OrderPage() {
    const location = useLocation();
    const { order, paymentSession } = location.state || {};

    if (!order || !paymentSession) {
        return <div>Loading...</div>;
    }

    return <OrderDetails order={order} paymentSession={paymentSession} />;
}

export default OrderPage;