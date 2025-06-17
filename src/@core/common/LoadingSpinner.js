
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">در حال بارگذاری...</span>
    </div>
    <span className="ms-2">در حال بارگذاری اطلاعات...</span>
  </div>
);

export default LoadingSpinner;