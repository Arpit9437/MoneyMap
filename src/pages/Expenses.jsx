// rrd imports
import { useLoaderData } from "react-router-dom";

// library import
import { toast } from "react-toastify";

// component imports
import Table from "../components/Table";

// helpers
import { deleteItemLS, fetchData } from "../helpers";

// loader
export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

// action
export  function expensesAction({ request }) {
  const data =  request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItemLS({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Expenses = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default Expenses;