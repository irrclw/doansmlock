import hust from '../img/HUST.png'

const Header = () => {
    return (
        <header className="relative w-full h-auto flex flex-row justify-between items-center border">
            <img src={hust} className='w-auto h-48' />
            <h1 className='text-9xl'>SMART DOOR LOCK</h1>
            <div className='flex flex-col bg-slate-600 h-48 w-48 justify-center items-center'>
                <h1 className='text-6xl'>BB</h1>
                <h1 className='text-6xl'>LAB</h1>
            </div>
        </header>
    )
}


export default Header;