import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";

import { deposit, withdraw, loan, payLoan } from "./AccountSlice";

function AccountOperation() {
  const [value, setValue] = useState({
    deposit: "",
    withdraw: "",
    loanAmount: "",
    loanPurpose: "",
    currency: "USD",
  });

  const setValues = (e) => {
    setValue((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  const {
    loan: loans,
    balance,
    loanPurpose: purpose,
    isLoading,
  } = useSelector((store) => store.account);

  const dispatch = useDispatch();

  function handleDeposit() {
    if (!value.deposit) return;
    dispatch(deposit(Number(value.deposit), value.currency));
    setValue((data) => ({ ...data, deposit: "", currency: "USD" }));
  }
  function handleWithdraw() {
    if (!value.withdraw) return;
    dispatch(withdraw(Number(value.withdraw)));
    setValue((data) => ({ ...data, withdraw: "" }));
  }
  function handleLoan() {
    if (!value.loanAmount || !value.loanPurpose) return;
    dispatch(loan(Number(value.loanAmount), value.loanPurpose));
    setValue((data) => ({ ...data, loanAmount: "", loanPurpose: "" }));
  }
  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label htmlFor="deposit">Deposit: </label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            value={value.deposit}
            onChange={setValues}
          />
          <select value={value.currency} onChange={setValues} name="currency">
            <option value="USD"> USD</option>
            <option value="EUR"> EUR</option>
            <option value="GBP"> GBP</option>
            <option value="PHP"> PHP</option>
          </select>
          <Button
            label={
              !isLoading
                ? `Deposit ${!value.deposit ? "" : value.deposit}`
                : "Converting...."
            }
            clickFunction={handleDeposit}
            disabled={!value.deposit}
          />
        </div>
        <div>
          <label htmlFor="withdraw">Withdraw: </label>
          <input
            type="number"
            id="withdraw"
            name="withdraw"
            value={value.withdraw}
            onChange={setValues}
          />

          <Button
            label={`Withdraw ${!value.withdraw ? "" : value.withdraw}`}
            clickFunction={handleWithdraw}
            disabled={!value.withdraw || value.withdraw > balance}
          />
        </div>

        <div>
          <label htmlFor="loan">Request Loan: </label>
          <input
            type="number"
            id="loan"
            placeholder="loan amount"
            name="loanAmount"
            value={value.loanAmount}
            onChange={setValues}
          />
          <input
            type="text"
            placeholder="loan purpose"
            name="loanPurpose"
            value={value.loanPurpose}
            onChange={setValues}
          />
          <Button
            label="Request Loan"
            clickFunction={handleLoan}
            disabled={loans !== 0 || !value.loanAmount}
          />
        </div>

        <div>
          <span>
            Pay Back:{loans} ({purpose})
          </span>
          <Button
            label="Pay Loan"
            clickFunction={handlePayLoan}
            disabled={!loans || balance === 0}
          />
        </div>
      </div>
    </>
  );
}

export default AccountOperation;
