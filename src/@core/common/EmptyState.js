import { Alert, Button } from "reactstrap";

const EmptyState = ({ onReset }) => (
  <tr>
    <td colSpan="8">
      <Alert color="info" className="text-center">
        <h4 className="alert-heading mb-1">موردی یافت نشد</h4>
        <p className="mb-1">با تنظیمات فعلی فیلترها، نتیجه‌ای یافت نشد.</p>
        <Button color="primary" onClick={onReset}>
          حذف فیلترها
        </Button>
      </Alert>
    </td>
  </tr>
);

export default EmptyState;
