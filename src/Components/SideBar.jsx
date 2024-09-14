import { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { LuPencil } from "react-icons/lu";
import { MdInbox, MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/appSlice';

const sidebarItems = [
    {
        icon: <MdInbox size={'20px'} />,
        text: "Inbox"
    },
    {
        icon: <IoMdStar size={'20px'} />,
        text: "Starred"
    },
    {
        icon: <MdOutlineWatchLater size={'20px'} />,
        text: "Snoozed"
    },
    {
        icon: <TbSend2 size={'20px'} />,
        text: "Sent"
    },
    {
        icon: <MdOutlineDrafts size={'20px'} />,
        text: "Drafts"
    },
    {
        icon: <MdOutlineKeyboardArrowDown size={'20px'} />,
        text: "More"
    },
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState("Inbox"); // Active state for highlighting

    const handleClick = (itemText) => {
        setActiveItem(itemText);
        // Logic to navigate to the selected section could be added here
    };

    return (
        <div className='w-[15%]'>
            <div className='p-3'>
                <button
                    onClick={() => dispatch(setOpen(true))}
                    className='flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow-md'
                    aria-label="Compose new email"
                >
                    <LuPencil size="24px" />
                    Compose
                </button>
            </div>
            <div className='text-gray-600'>
                {
                    sidebarItems.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => handleClick(item.text)}
                                className={`flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200 
                                    ${activeItem === item.text ? 'bg-gray-200 font-bold' : ''}`}
                                aria-label={item.text}
                            >
                                {item.icon}
                                <p>{item.text}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Sidebar;
