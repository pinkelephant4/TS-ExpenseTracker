import { useState } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "default",
      amount: 10,
      category: "Utilities",
      date: new Date(),
    },
    
  ]);
  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;
  // const handleSubmit = (data: {
  //   id: number;
  //   description: string;
  //   amount: number;
  //   category: string;
  // }) => {
  //   console.log(data);
  //   setExpenses([
  //     ...expenses,
  //     {
  //       id: data.id,
  //       description: data.description,
  //       amount: data.amount,
  //       category: data.category,
  //     },
  //   ]);
  // };
  return (
    <>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter onFilter={(category) => setSelectedCategory(category)} />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => {
          setExpenses(expenses.filter((expense) => id !== expense.id));
        }}
      />
    </>
  );
}

export default App;
