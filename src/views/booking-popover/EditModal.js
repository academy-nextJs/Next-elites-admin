import { useState } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import ReusableModal from "../../@core/common/Modal";

const EditModal = ({ isOpen, toggle, initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTravelerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTravelers = [...formData.traveler_details];
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [name]: value,
    };

    setFormData((prev) => ({
      ...prev,
      traveler_details: updatedTravelers,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const bodyContent = (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>ایمیل مشترک</Label>
        <Input
          type="email"
          name="sharedEmail"
          value={formData.sharedEmail}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>موبایل مشترک</Label>
        <Input
          type="tel"
          name="sharedMobile"
          value={formData.sharedMobile}
          onChange={handleChange}
        />
      </FormGroup>

      <h5 className="mt-4">اطلاعات مسافران</h5>
      {formData.traveler_details?.map((traveler, index) => (
        <div key={index} className="border p-3 mb-3">
          <FormGroup>
            <Label>نام</Label>
            <Input
              name="firstName"
              value={traveler.firstName}
              onChange={(e) => handleTravelerChange(index, e)}
            />
          </FormGroup>

          <FormGroup>
            <Label>نام خانوادگی</Label>
            <Input
              name="lastName"
              value={traveler.lastName}
              onChange={(e) => handleTravelerChange(index, e)}
            />
          </FormGroup>

          <FormGroup>
            <Label>جنسیت</Label>
            <Input
              type="select"
              name="gender"
              value={traveler.gender}
              onChange={(e) => handleTravelerChange(index, e)}
            >
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label>تاریخ تولد</Label>
            <Input
              type="date"
              name="birthDate"
              value={traveler.birthDate}
              onChange={(e) => handleTravelerChange(index, e)}
            />
          </FormGroup>

          <FormGroup>
            <Label>کد ملی</Label>
            <Input
              name="nationalId"
              value={traveler.nationalId}
              onChange={(e) => handleTravelerChange(index, e)}
            />
          </FormGroup>
        </div>
      ))}
    </Form>
  );

  const footerActions = (
    <>
      <Button color="primary" onClick={handleSubmit}>
        ذخیره تغییرات
      </Button>
      <Button color="secondary" onClick={toggle}>
        انصراف
      </Button>
    </>
  );

  return (
    <ReusableModal
      isOpen={isOpen}
      toggle={toggle}
      title="ویرایش رزرو"
      bodyContent={bodyContent}
      footerActions={footerActions}
    />
  );
};

EditModal.defaultProps = {
  initialData: {
    houseId: "",
    reservedDates: [],
    traveler_details: [
      {
        firstName: "",
        lastName: "",
        gender: "male",
        birthDate: "",
        nationalId: "",
      },
    ],
    sharedEmail: "",
    sharedMobile: "",
  },
};

export default EditModal;
