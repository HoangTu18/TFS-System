import { Table } from "antd";
import "../Food/food.style.scss";
function OrderParty({ data, closeModel }) {
  const columns = [
    {
      title: "Tên món ăn",
      dataIndex: "foodName",
      key: "foodName",
      width: 600,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <div className="popup">
      <div
        className="form-up"
        style={{
          width: "900px",
          height: "400px",
          marginLeft: -60,
          marginTop: -40,
        }}
      >
        <div className="food__title unselectable">Thực đơn bàn tiệc</div>
        <div style={{ marginLeft: 45, marginRight: 45 }}>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            scroll={{
              x: 0,
              y: 190,
            }}
          />
        </div>
        <div
          className="food__button"
          style={{ position: "absolute", right: 0 }}
        >
          <button
            type="button"
            className="btn cancel"
            onClick={() => closeModel(false)}
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderParty;
