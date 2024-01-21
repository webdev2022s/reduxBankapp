import { useSelector } from "react-redux";

import AccountOperation from "./features/accounts/AccountOperation";
import BalanceDisplay from "./features/accounts/BalanceDisplay";

import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";

function App() {
  const fullname = useSelector((store) => store.customer.fullname);
  return (
    <>
      <h1>🏦 React-Redux-Bank 💰</h1>
      {!fullname ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperation />
          <BalanceDisplay />
        </>
      )}
    </>
  );
}

export default App;
