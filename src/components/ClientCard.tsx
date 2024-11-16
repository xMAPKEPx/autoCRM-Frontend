import React, {useState} from "react";
import ClientCardHistory from "./ClientCardHistory.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks.ts";
import {setOpen} from "../redux/ModalSlice/modalSlice.ts";

type propTypes = {
    onClose: ()=>void;
}

const ClientCard: React.FC<propTypes> = ({onClose}) => {
    const [historySelected, setHistorySelected] = useState(false)
    const handleSelectionChange = (selected: boolean) => {
        setHistorySelected(selected);
    };
    const clientData = useAppSelector(state => state.client.clientData)
    const dispatch = useAppDispatch();

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault()
        //Запрос отправки
        dispatch(setOpen(false))
    }

    return <>
        {historySelected ? <ClientCardHistory setSelection={handleSelectionChange} onClose={onClose} name={clientData.name}/> :
            <form
                className={'flex flex-col h-full bg-[#F5D9C4] fixed inset-y-0 z-10 right-0 max-w-xm w-full px-12 py-16'}>
                <button type={'button'}
                    className="absolute top-2 right-2 py-1 px-2
                    border border-neutral-200 rounded-md text-gray-400
                    bg-white hover:bg-gray-50 hover:text-gray-600"
                    onClick={onClose}
                >
                    X
                </button>
                <input className={'text-2xl font-semibold text-black bg-transparent'} value={clientData.name?clientData.name:"ФИО"} />
                <div className={'flex flex-row mt-7 gap-10'}>
                    <button
                        className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>информация
                    </button>
                    <button onClick={() => setHistorySelected(true)}
                            className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>история
                    </button>
                </div>
                <div className='flex flex-col mt-10'>
                    <label className='text-lg font-bold font-golos'>E-mail</label>
                    <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'
                    value={clientData.email} readOnly
                    />
                </div>
                <div className='flex flex-col mt-10'>
                    <label className='text-lg font-bold font-golos'>Телефон</label>
                    <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'
                    value={clientData.phone} readOnly
                    />
                </div>
                <div className='flex flex-col mt-10'>
                    <label className='text-lg font-bold font-golos'>Дата создания</label>
                    <input className='w-[31.25rem] h-10 mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl'
                    value={clientData.creation_date} readOnly
                    />
                </div>
                <div className='flex flex-col mt-10'>
                    <label className='text-lg font-bold font-golos'>Заметка</label>
                    <textarea className='w-[31.25rem]  mt-2.5 text-lg font-medium font-golos
                        rounded-md p-2 disabled:bg-[#FFFFFF] focus:outline-none shadow-xl resize-none' rows={5}
                              cols={33}/>
                </div>
                <div className={'flex flex-row gap-10 justify-center mt-44'}>
                    <button type='submit'
                        className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>сохранить
                    </button>
                    <button type='reset'
                        className={'text-center text-lg font-semibold button py-2 px-11 bg-[#4C2A21] rounded-md text-[#FFFFFF] btn'}>сбросить
                    </button>
                </div>
            </form>}
    </>;
};

export default ClientCard;