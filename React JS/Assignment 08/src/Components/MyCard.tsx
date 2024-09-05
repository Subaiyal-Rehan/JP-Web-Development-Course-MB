import "./MyCard.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarRateOutlinedIcon from "@mui/icons-material/StarRateOutlined";
import { useNavigate } from "react-router-dom";

function MyCard(props: any) {
  const navigate = useNavigate()
  const ratingFunc = (rate: any) => {
    let filledStars = Math.round(rate);
    let emptyStars = 5 - filledStars;
    let fillArr = new Array(filledStars).fill(null);
    let emptyarr = new Array(emptyStars).fill(null);

    return (
      <div className="d-flex align-items-center">
        {fillArr.map((_, i: any) => (
          <span key={i} className="d-flex align-items-center text-warning fs-3">
            <StarRateIcon />
          </span>
        ))}
        {emptyarr.map((_, i: any) => (
          <span key={i} className="d-flex align-items-center text-warning fs-3">
            <StarRateOutlinedIcon />
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="CardContainer container row row-gap-5 mx-auto">
      {props.data.map((item:any, index:any) => (
        <div onClick={()=>navigate(`/Products/${item.id}`)} key={index} className="MyCard col-md-6 col-lg-3">
          <div className="CardImageContainer">
            <div className="CardImage position-relative">
              <img src={item.image} />
              <div className="position-absolute bottom-0 w-100">
                <button className="w-100 btn rounded-0">Quick View</button>
              </div>
            </div>
          </div>

          <div className="CardTextContainer d-flex flex-column gap-2 p-2">
            <div className="CardCategory">
              <span className="text-muted">{item.category}</span>
            </div>
            <div className="CardTitle">
              <h3 className="fs-5 m-0 text-truncate fw-semibold">{item.title}</h3>
            </div>
            <div className="CardDesc">
              <p className="m-0">{item.description.length > 50 ? item.description.slice(0,50) + "..." : item.description}</p>
            </div>
            <div className="CardRating">
              {ratingFunc(item.rating.rate)}
            </div>
            <div className="CardPrice">
              <span>${item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyCard;
