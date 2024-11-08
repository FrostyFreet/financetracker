import { PieChart } from "@mui/x-charts/PieChart";
import { inputTypes } from "../TransactionForm";
interface inputTypesProps {
	transactions: inputTypes[];
}
export interface ChartData {
	value: number;
	label: string;
	color: string;
	type?:string;
	date?:string;
  }

export default function Pie({ transactions }: inputTypesProps) {
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


	const size = {
		width: 1000,
		height: 200,
	};
	return (
		<>
			{data.length > 0 ? (
				<PieChart
					series={[
						{
							data: data,
							paddingAngle: 1,
						},
					]}
					{...size}
				/>
			) : (
				<h1 style={{ textAlign: "center" }}>No transactions added</h1>
			)}
		</>
	);
}
