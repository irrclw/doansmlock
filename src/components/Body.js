import { useDispatch, useSelector } from "react-redux";
import Table from './Table.js';
import action from '../redux/action.js';
import { useEffect, useState } from "react";


const Body = ({ data }) => {
    const state = useSelector(store => store);
    const [dataAtday, setDataAtday] = useState([]);
    const [day, setDay] = useState();
    const dispatch = useDispatch();
    const handleClick = (payload) => {
        dispatch(action(payload));
    }
    useEffect(() => {
        if (data) {
            if (day === undefined) {
                const toDay = new Date();
                setDay(toDay.toISOString().slice(0, 10))
            }
            const newToday = data.filter(x => eval('new ' + x[0]).toDateString() === new Date(day).toDateString());
            setDataAtday(newToday);
        }
    }, [data, day])
    return (
        <div className="relative flex-grow bg-slate-300 flex flex-row">
            <div className="relative w-80 h-full border border-white flex flex-col justify-start items-center p-5 ">
                <div className="p-3 w-52 rounded-xl"></div>
                <button className="p-3 w-52 rounded-xl" style={state === 'all' ? { backgroundColor: 'white' } : { backgroundColor: 'transparent' }} onClick={() => handleClick('all')}>All</button>
                <button className="p-3 w-52 rounded-xl" style={state === 'active' ? { backgroundColor: 'white' } : { backgroundColor: 'transparent' }} onClick={() => handleClick('active')}>Active</button>
                <button className="p-3 w-52 rounded-xl" style={state === 'left' ? { backgroundColor: 'white' } : { backgroundColor: 'transparent' }} onClick={() => handleClick('left')}>Have left</button>
            </div>
            <div className="relative w-full h-full p-3 border border-white flex flex-col gap-3 justify-start items-center">
                <input type="date" className="p-3 w-52 h-16 rounded-xl" onChange={(e) => setDay(e.target.value)} defaultValue={day} />
                <Table data={dataAtday} />
            </div>
        </div>
    )
}


export default Body;