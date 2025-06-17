import { Alert } from "reactstrap";

const ErrorDisplay = ({ error }) => (
  <Alert color="danger" className="mt-3">
    <h4 className="alert-heading">خطا در دریافت اطلاعات</h4>
    <p>{error.message || "خطایی در ارتباط با سرور رخ داده است."}</p>
    <hr />
    <p className="mb-0">لطفاً دقایقی دیگر مجدداً تلاش نمایید.</p>
  </Alert>
);

export default ErrorDisplay;
