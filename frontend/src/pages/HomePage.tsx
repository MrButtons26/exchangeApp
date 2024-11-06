import Navbar from "../components/Navbar";
import ChartTable from "../components/ChartTable";
export default function HomePage() {
  document.title='Backpack: Crypto Exchange'
  return (
    <>
      <Navbar></Navbar>
      <ChartTable></ChartTable>
    </>
  );
}
