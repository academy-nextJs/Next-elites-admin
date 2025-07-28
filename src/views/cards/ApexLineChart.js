// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "reactstrap";

const ApexLineChart = ({ data }) => {
  const months = data?.map((item) => item.month);
  const bookingCounts = data?.map((item) => Number(item.bookingCount));
  // ** Chart Options
  const options = {
    chart: {
      zoom: {
        enabled: false,
      },
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },

    markers: {
      strokeWidth: 7,
      strokeOpacity: 1,
      strokeColors: ["#2b9bf4"],
      colors: ["#2b9bf4"],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    colors: ["#2b9bf4"],
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: ['24-05', '24-06', '24-07', '24-08', '24-09', '24-10', '24-11', '24-12' ,'25-01', '25-02', '25-03', '25-04', '25-04', months],
    },
    yaxis: {
      opposite: true,
    },
  };

  // ** Chart Series
  const series = [
    {
      data: ['21', '12', '14', '19', '7', '10', '18', '8', '10', '11', '8', '20', '21', bookingCounts],
    },
  ];

  return (
    <Card>
      <CardHeader className="d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start">
        <div>
          <CardTitle className="mb-75" tag="h4">
            رزرو های کاربران
          </CardTitle>
          <CardSubtitle className="text-muted">
            تعداد رزرو های کاربران در ماه های اخیر
          </CardSubtitle>
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="line" height={250} />
      </CardBody>
    </Card>
  );
};

export default ApexLineChart;
