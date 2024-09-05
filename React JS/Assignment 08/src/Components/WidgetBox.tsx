import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

function WidgetBox() {
  return (
    <div className="WidgetBoxContainer d-flex justify-content-around container mx-auto">
      <div className="WdigetBox rounded py-3 px-4 d-flex gap-3 justify-content-around align-items-center">
        <div>
          <LocalShippingOutlinedIcon className="fs-1" />
        </div>
        <div className="fs-4 fw-bold">Express Delivery</div>
      </div>
      <div className="WdigetBox rounded py-3 px-4 d-flex gap-3 justify-content-around align-items-center">
        <div>
          <PinDropOutlinedIcon className="fs-1" />
        </div>
        <div className="fs-4 fw-bold">Order Tracking</div>
      </div>
      <div className="WdigetBox rounded py-3 px-4 d-flex gap-3 justify-content-around align-items-center">
        <div>
          <DiscountOutlinedIcon className="fs-1" />
        </div>
        <div className="fs-4 fw-bold">Regular Discounts</div>
      </div>
    </div>
  );
}

export default WidgetBox;
