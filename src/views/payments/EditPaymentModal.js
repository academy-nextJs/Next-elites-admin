import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import ReusableModal from "../../@core/common/Modal";

const EditPaymentModal = ({ isOpen, toggle, paymentData, onSubmit }) => {
  const [paymentAmount, setPaymentAmount] = useState(paymentData.amount || "");
  const [description, setDescription] = useState(paymentData.description || "");

  useEffect(() => {
    setPaymentAmount(paymentData.paymentAmount || "");
    setDescription(paymentData.description || null);
  }, [paymentData]);

  const handleSubmit = () => {
    onSubmit({ amount: paymentAmount, description: description });
    toggle();
  };

  const bodyContent = (
    <>
      <FormGroup>
        <Label for="paymentPrice">قیمت</Label>
        <Input
          id="paymentPrice"
          type="text"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
        <Label for="description">توضیحات</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
    </>
  );

  const footerActions = (
    <>
      <Button color="primary" onClick={handleSubmit}>
        تایید
      </Button>
      <Button color="secondary" onClick={toggle}>
        لغو
      </Button>
    </>
  );

  return (
    <ReusableModal
      isOpen={isOpen}
      toggle={toggle}
      title="ویرایش پرداخت"
      bodyContent={bodyContent}
      footerActions={footerActions}
    />
  );
};

export default EditPaymentModal;
