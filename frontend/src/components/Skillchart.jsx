import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SkillChart({ score }) {

  const data = {
    labels: ["Matched Skills", "Missing Skills"],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#4CAF50", "#FF6384"]
      }
    ]
  };

  return (
    <div style={{ width: "300px" }}>
      <Pie data={data} />
    </div>
  );
}