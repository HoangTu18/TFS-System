import moment from "moment/moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerRequest } from "../../pages/CustomerManager/CustomerManageSlice";
import { getFeedbackRequest } from "../../pages/FeedbackManager/feedbackSlice";
import "./feedback.style.scss";
function FeedbackView({ closeModel, data }) {
  const dispatch = useDispatch();
  const feedbackList = useSelector(
    (state) => state.feedbackManage.listFeedback
  );
  const customerList = useSelector(
    (state) => state.customerManage.listCustomer
  );
  useEffect(() => {
    dispatch(getFeedbackRequest());
    dispatch(getCustomerRequest());
  }, [dispatch]);

  const commentList = feedbackList.filter((item) => item.food.id === +data.id);

  const getCusName = (customerId) => {
    const foundItem = customerList.find(
      (item) => item.customerId === +customerId
    );
    if (!foundItem) {
      return "Error: customer ID not found";
    }
    return foundItem.customerName;
  };
  return (
    <div className="popup">
      <form
        className="form-up"
        style={{ width: "1100px" }}
        noValidate
        autoComplete="off"
      >
        <div className="feedback__title unselectable">Danh sách đánh giá</div>

        <ul className="listFeedback">
          {commentList.map((item, index) => {
            return (
              <li className="box" key={index}>
                <div className="left" style={{ margin: "10px 30px 0 0" }}>
                  <img className="imageFeedback" src={item.avatarUrl} alt="" />
                </div>
                <div className="right">
                  <span className="name">{getCusName(item.customerId)}</span>
                  <div className="rate">
                    <i
                      className={
                        "fa fa-star" + (item.rate >= 1 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />

                    <i
                      className={
                        "fa fa-star" + (item.rate >= 2 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />
                    <i
                      className={
                        "fa fa-star" + (item.rate >= 3 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />
                    <i
                      className={
                        "fa fa-star" + (item.rate >= 4 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />
                    <i
                      className={
                        "fa fa-star" + (item.rate === 5 ? " checked" : "")
                      }
                      aria-hidden="true"
                    />
                  </div>
                  <span className="date">
                    {moment(item.createdAt).format("DD/MM/yyyy HH:mm:ss")}
                  </span>
                  <span className="comment">{item.comment}</span>
                </div>
                <hr className="horizonalLine" />
              </li>
            );
          })}
        </ul>
        <div className="feedback__button">
          <button
            type="button"
            className="btn cancel"
            onClick={() => closeModel(false)}
          >
            Đóng
          </button>
        </div>
      </form>
    </div>
  );
}
export default FeedbackView;
