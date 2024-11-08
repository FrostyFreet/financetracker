import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/pages/DashBoard.tsx";
import ErrorPage from "./components/pages/ErrorPage.tsx";
import Transactions from "./components/pages/Transactions.tsx";
import { useState } from "react";
import { inputTypes } from "./components/TransactionForm.tsx";


function App() {
	const [transactions, setTransactions] = useState<inputTypes[]>([]);
	function addTransaction(newTransaction: inputTypes) {
		setTransactions((prevState) => [...prevState, newTransaction]);
		console.log("Submitted", newTransaction);
	}

	const router = createBrowserRouter([
		{
			path: "/",
			element: <DashBoard onSubmit={addTransaction} transactions={transactions} />,
			errorElement: <ErrorPage />,
		},
		{
			path: "/transactions",
			element: (
				<Transactions
					transactions={transactions}
					setTransactions={setTransactions}
				/>
			),
			errorElement: <ErrorPage />,
		},
		
	]);
	return <RouterProvider router={router} />;
}

export default App;
