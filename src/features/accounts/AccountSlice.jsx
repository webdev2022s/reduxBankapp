import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    loan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },

    payLoan(state) {
      const deductionBalance =
        state.balance - state.loan < 0 ? 0 : state.balance - state.loan;
      const deductionLoan =
        state.loan - state.balance < 0 ? 0 : state.loan - state.balance;

      state.balance = deductionBalance;
      state.loan = deductionLoan;
      state.loanPurpose = "";
    },
    isLoading(state) {
      state.isLoading = true;
    },
  },
});

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch) {
    dispatch({ type: "account/isLoading" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();

    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
}

export const { withdraw, loan, payLoan } = accountReducer.actions;

export default accountReducer.reducer;
