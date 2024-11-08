import {
	Box,
	Button,
	CssBaseline,
	Divider,
	FormControl,
	IconButton,
	Input,
	InputLabel,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import { inputTypes } from "../TransactionForm.tsx";
import Footer from "../Footer.tsx";
import Header from "../Header.tsx";
import Sidebar from "../Sidebar.tsx";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // For income
import CancelIcon from "@mui/icons-material/Cancel"; // For expenses
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dispatch, SetStateAction, useState } from "react";

interface inputTypesProps {
	transactions: inputTypes[];
	setTransactions: Dispatch<SetStateAction<inputTypes[]>>;
}
export default function Transactions({transactions,setTransactions,}: inputTypesProps) {
	
	


	const [editTransaction, setEditTransaction] = useState<inputTypes | null>(null);
	const [filter,setFilter]=useState<string>('')	
	const [searchTerm,setSearchTerm]=useState<string>('')
	
	function deleteButton(id: string) {
		const taskToDelete = transactions.filter((t) => t.id !== id);
		setTransactions(taskToDelete);
	}
	function editButton(id: inputTypes) {setEditTransaction(id)}

	function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (editTransaction) {
			setEditTransaction({
				...editTransaction,
				[e.target.name]: e.target.value,
			});
		}
	}

	function saveEdit() {
		if (editTransaction) {
			setTransactions((prevTransactions) =>
				prevTransactions.map((transaction) =>
					transaction.id === editTransaction.id ? editTransaction : transaction
				)
			);
			setEditTransaction(null); // Reset edit mode
		}}

	function filterHandler(e:SelectChangeEvent){setFilter(e.target.value);}

	function handleSearchBar(e:React.ChangeEvent<HTMLInputElement>){
		setSearchTerm(e.target.value)
	}


	let filteredTransactions = [...transactions];

	const sortedByDate = [...transactions].sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
	const sortedAscending = [...transactions].sort((a, b) => a.amount - b.amount);
	const sortedDescending = [...transactions].sort((a, b) => b.amount - a.amount);
	const sortedByExpenseType = [...transactions].sort((a, b) => {
		const typeA = a.type ?? ''; 
		const typeB = b.type ?? ''; 
		return typeA.localeCompare(typeB);
	  });
	const sortedByIncomeType = [...transactions].sort((a, b) => {
		const typeA = a.type ?? ''; 
		const typeB = b.type ?? ''; 
		return typeB.localeCompare(typeA);
	  });

	if (filter === 'date') {filteredTransactions = sortedByDate} 
	else if (filter === '2highest') {filteredTransactions = sortedAscending} 
	else if (filter === '2lowest') {filteredTransactions = sortedDescending}
	else if(filter==='byExpense'){filteredTransactions = sortedByExpenseType}
	else if(filter==='byIncome'){filteredTransactions = sortedByIncomeType}

	const filteredAndSearchedTransactions = filteredTransactions.filter((transaction) =>
		transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
	  );
	return (
		<>
			<Box sx={{ display: "flex", height: "100vh" }}>
				<CssBaseline />
				<Sidebar />
				<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
					<Header />

					
					<FormControl sx={{ m: 1, maxWidth: 120, float:'right' }} size="medium">
					<Input
						placeholder="Search"
						type="text"
						name="searchTerm"
						value={searchTerm}
						onChange={handleSearchBar}
						required
					/>

					</FormControl>

					<FormControl sx={{ m: 1, maxWidth: 120 }} size="medium">
						<InputLabel id="Transaction_Type">Filter</InputLabel>
						<Select
							labelId="Transaction_Type"
							id="Transaction_Type"
							value={filter}
							label="Transaction Type"
							onChange={filterHandler}
						>
							<MenuItem value={"date"}>Date</MenuItem>
							<MenuItem value={"2highest"}>Lowest To Highest</MenuItem>
							<MenuItem value={"2lowest"}>Highest To Lowest</MenuItem>
							<MenuItem value={"byExpense"}>Expenses First</MenuItem>
							<MenuItem value={"byIncome"}>Incomes First</MenuItem>
		
						</Select>
					</FormControl>

					<Box sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5" }}>
						<List>
						{filteredAndSearchedTransactions.length===0 && <h1 style={{textAlign:'center'}}>No transactions added</h1>}
							{filteredAndSearchedTransactions.map((transaction)=> (
								<div key={transaction.id}>
									 
									{editTransaction && editTransaction.id === transaction.id ? (
										// Render edit form for the selected transaction
										<Box
											component="form"
											sx={{ display: "flex", gap: 2, mb: 2 }}
										>
											<TextField
												label="Category"
												name="category"
												value={editTransaction.category}
												onChange={handleEditChange}
											/>
											<TextField
												label="Amount"
												name="amount"
												type="number"
												value={editTransaction.amount}
												onChange={handleEditChange}
											/>
											<TextField
												label="Description"
												name="description"
												value={editTransaction.description}
												onChange={handleEditChange}
											/>
											<TextField
												label="Date"
												name="date"
												type="date"
												value={editTransaction.date}
												onChange={handleEditChange}
											/>
											<Button
												variant="contained"
												color="primary"
												onClick={saveEdit}
											>
												Save
											</Button>
										</Box>
									) : (
										// Regular display of the transaction item
										
										<ListItem
											sx={{
												backgroundColor:
													transaction.type === "income" ? "#e0f7fa" : "#ffebee",
												marginBottom: 1,
												borderRadius: 1,
											}}
										>
											<ListItemIcon>
												{transaction.type === "income" ? (
													<CheckCircleIcon sx={{ color: "#00796b" }} />
												) : (
													<CancelIcon sx={{ color: "#d32f2f" }} />
												)}
											</ListItemIcon>
											<ListItemText
												primary={transaction.category}
												secondary={`${transaction.date} - ${transaction.description}`}
											/>
											<ListItemText
												primary={`$${Math.abs(transaction.amount).toFixed(2)}`}
												sx={{
													color:
														transaction.type === "income"
															? "#00796b"
															: "#d32f2f",
													fontWeight: "bold",
													textAlign: "right",
												}}
											/>
											<IconButton
												edge="end"
												color="primary"
												onClick={() => editButton(transaction)}
											>
												<EditIcon />
											</IconButton>
											<IconButton
												edge="end"
												color="secondary"
												onClick={() => deleteButton(transaction.id)}
											>
												<DeleteIcon />
											</IconButton>
										</ListItem>
									)}
									<Divider />
								</div>
							))}
						</List>
						
					</Box>

					<Footer />
				</Box>
			</Box>
		</>
	);
}
