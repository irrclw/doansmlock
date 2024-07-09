import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Row = ({ id, name, timeIn, timeOut }) => {
    return (
        <tr className=''>
            <td className='id'>{id}</td>
            <td className='name'>{name}</td>
            <td className='id'>{timeIn}</td>
            <td className='id'>{timeOut}</td>
        </tr>
    )
}

const Table = ({ data }) => {
    const state = useSelector(store => store);
    const [formatedData, setFormatedData] = useState(null);
    const [showData, setShowData] = useState(null);
    useEffect(() => {
        if (data) {
            const newData = {}
            for (let x of data) {
                !newData[x[1]] ? newData[x[1]] = { name: x[2], time: [x[0]] } : newData[x[1]].time.push(x[0]);
            }
            const format = [];
            for (let x in newData) {
                if (newData[x].time.length % 2 === 0){
                    newData[x].time = [newData[x].time[newData[x].time.length-2], newData[x].time[newData[x].time.length-1]];
                }
                else{
                    newData[x].time = [newData[x].time[newData[x].time.length-1], '---']
                }
                newData[x].time[newData[x].time.length-1] !== '---' ? newData[x].lastTime = eval('new '+newData[x].time[newData[x].time.length-1]).getTime() : newData[x].lastTime = eval('new '+newData[x].time[newData[x].time.length-2]).getTime();
                format.push({ ...newData[x], id: x })
                for (let i in format[format.length-1].time){
                    if (format[format.length-1].time[i] !== '---'){
                        format[format.length-1].time[i] = eval('new ' + format[format.length-1].time[i]).toString().slice(16, 24)
                    }
                }
            }
            format.sort((x, y) => x-y);
            setFormatedData(format);
        }
    }, [data]);
    useEffect(() => {
        if (state === 'all'){setShowData(formatedData);}
        else if (state === 'active'){
            const x = formatedData.filter(e => e.time[1] === '---')
            setShowData(x);
        }
        else if (state === 'left'){
            const x = formatedData.filter(e => e.time[1] !== '---')
            setShowData(x);
        }
    }, [state, formatedData]);
    return (
        <table>
            <tbody>
                <tr className=''>
                    <td className='id font-bold'>ID</td>
                    <td className='name font-bold'>Name</td>
                    <td className='id font-bold'>Time in</td>
                    <td className='id font-bold'>Time out</td>
                </tr>
                {showData && showData.map(x => <Row id={x.id} name={x.name} timeIn={x.time[0]} timeOut={x.time[1]} key={x.id} />)}
            </tbody>
        </table>
    )
}


export default Table;