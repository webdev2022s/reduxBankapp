import { connect, useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  const { isLoading } = useSelector((store) => store.account);

  return (
    <div className="balance">
      {isLoading ? "updating..." : formatCurrency(balance)}
    </div>
  );
}

function mapStateToProps(store) {
  return {
    balance: store.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
