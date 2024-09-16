import { useState } from 'react';
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import { GoTag } from "react-icons/go";
import Emails from './Emails'; // Assuming Emails component already exists
import '../App.css'
const mailType = [
    {
        icon: <MdInbox size={'20px'} />,
        text: "Primary",
    },
    {
        icon: <GoTag size={'20px'} />,
        text: "Promotions",
    },
    {
        icon: <FaUserFriends size={'20px'} />,
        text: "Social",
    },
];

const mockEmails = {
    Primary: [
        { id: 1, subject: 'Work Update', sender: 'Work', body: 'Important update on the project...' },
        { id: 2, subject: 'Invoice', sender: 'Billing', body: 'Your invoice for the month...' },
    ],
    Promotions: [
        { id: 1, subject: 'Sale!', sender: 'Store', body: 'Get 50% off on all items!' },
        { id: 2, subject: 'Exclusive Offer', sender: 'Brand', body: 'Limited-time offer just for you...' },
    ],
    Social: [
        { id: 1, subject: 'Friend Request', sender: 'John Doe', body: 'John sent you a friend request.' },
        { id: 2, subject: 'Event Invitation', sender: 'Jane', body: 'You are invited to a party...' },
    ],
};

const Inbox = () => {
    const [selected, setSelected] = useState(0);

    const selectedCategory = mailType[selected].text;

    return (
        <div className='inbox-container'>
            {/* Top Bar: Refresh, More Options */}
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <div className='icon-group'>
                        <MdCropSquare size={'20px'} />
                        <FaCaretDown size={'20px'} />
                    </div>
                    <div className='icon-button'>
                        <IoMdRefresh size={'20px'} />
                    </div>
                    <div className='icon-button'>
                        <IoMdMore size={'20px'} />
                    </div>
                </div>
                <div className='pagination'>
                    <span>1 to 50</span>
                    <MdKeyboardArrowLeft size="24px" />
                    <MdKeyboardArrowRight size="24px" />
                </div>
            </div>

            {/* Mail Types (Primary, Promotions, Social) */}
            <div className='mail-types'>
                {mailType.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setSelected(index)}
                        className={`mail-type-button ${selected === index ? "selected" : ""}`}
                    >
                        {item.icon}
                        <span>{item.text}</span>
                    </button>
                ))}
            </div>

            {/* Emails Component: Pass selected mail type's data */}
            <Emails emails={mockEmails[selectedCategory]} />
        </div>
    );
};

export default Inbox;
