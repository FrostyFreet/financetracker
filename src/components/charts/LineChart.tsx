import { LineChart } from "@mui/x-charts";
import { inputTypes } from "../TransactionForm";
import { ChartData } from "./PieChart";
interface inputTypesProps {
	transactions: inputTypes[];
}


export default function Line({transactions}:inputTypesProps){
    const data = transactions.reduce<ChartData[]>((acc, t) => {
        const existing = acc.find(item => item.label === t.category && t.type===item.type);
        if (existing) {
          existing.value = Number(existing.value) + Number(t.amount)
        } else {
          acc.push({
            value: Number(t.amount),
            label: t.category,
            color: t.type === "income" ? "#4caf50" : "#f44336"
          });
        }
        return acc;
      }, []);
    return(
        <>{data.length > 0 ? (
                <LineChart
                xAxis={[{ data: data.map((item)=>(item.label)),scaleType:'band' }]}
                series={[
                {
                    data:data.map((item)=>(item.value))
                },
                ]}
                width={500}
                height={300}
            />):(
				<h1 style={{ textAlign: "center" }}>No transactions added</h1>
			)}
      </>
    )
}