import { PieChart } from '@mui/x-charts/PieChart';
import { inputTypes } from "../TransactionForm";

interface inputTypesProps {
    transactions: inputTypes[]
    
}

export default function Pie({transactions}:inputTypesProps){

    const data=[...transactions.map((t)=>({
        id:t.id,
        value:t.amount,
        label:t.category
    }))]

    const size = {
  width: 1000,
  height: 200,
};
    return(
      <>
      {data.length>0 ? <PieChart
        series={[
          {
            data: data, 
            paddingAngle: 1, 
          },
        ]}

        {...size} 
      /> : <h1 style={{textAlign:'center'}}>No transactions added</h1>
    }
        

      </>
    )

}