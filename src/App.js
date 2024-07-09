import { useEffect, useState } from "react";
import fullURL from "./googleSheet";
import Header from "./components/Header";
import Body from "./components/Body";



function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = () => {
      fetch(fullURL)
        .then(res => res.text())
        .then(text => {
          let raw1 = JSON.parse(text.substr(47).slice(0, -2));
          let raw2 = raw1.table.rows.map((ele) => ele.c);
          const data = [];
          for (let row of raw2) {
            row = row.filter((e) => e !== null && e !== undefined);
            let temp = row.map((e) => e.v);
            temp = temp.filter(e => e !== null);
            data.push(temp);
          }
          setData(data);
        })
        .catch(err => console.error(err));
    }
    fetchData();
    let timer = setInterval(fetchData, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="App relative h-screen w-screen flex flex-col">
      <Header />
      <Body data={data} />
    </div>
  );
}

export default App;
