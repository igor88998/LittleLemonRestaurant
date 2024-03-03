'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Cancel from '@/components/icons/Cancel'
import toast from "react-hot-toast";
import { useProfile } from "@/components/UseProfile";

export default function ReservationPage() {

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [showPopup, setShowPopup] = useState(false)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    async function handleAddBookingClick() {
        if (!showPopup) {
            setShowPopup(true);
            return;
        }

        try {
            const response = await fetch('/api/reservation', {
                method: 'POST',
                body: JSON.stringify({ date, time, numberOfGuests, name, phoneNumber }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                setShowPopup(false);
                toast.success('Table booked successfully!');
            } else {
                toast.error('Failed to book table. Please try again later.');
            }
        } catch (error) {
            console.error('Error while booking table:', error);
            toast.error('An error occurred while booking the table. Please try again later.');
        }
    }

    return (
        <section className="bg-primary">
            <div className="text-center max-w-4xl mx-auto py-10">
                <h2 className="text-5xl text-yellow">Little Lemon</h2>
                <h1 className="text-6xl text-white">BOOK A TABLE</h1>
                <div className="flex justify-center">
                    <Image src={'/ReservationIcon.png'} height={200} width={200} alt={'Reservation Icon'} />
                </div>
                <div className="mt-5 mb-10">
                    <p className="text-4xl text-white">
                        Monday to Friday 9:00 am to 11:00 pm
                    </p>
                    <p className="text-4xl text-white">
                        Saturday and Sunday 10:00 am to 12:00 pm
                    </p>
                </div>
                <div className="flex justify-center items-center text-white">
                    <span className='w-[200px]'>
                        <hr />
                    </span>
                    <p className="text-2xl mx-3">RESERVATION</p>
                    <span className='w-[200px]'>
                        <hr />
                    </span>
                </div>

                <div className="flex justify-between items-center mx-24 my-7">
                    <div>
                        <label className="text-2xl flex text-white text-start my-3">Select Day</label>
                        <input
                            type="date"
                            value={date}
                            onChange={ev => setDate(ev.target.value)}
                            className="input-date text-2xl w-[220px] h-14 px-4 bg-primary border border-white text-white" />
                    </div>

                    <div className="">
                        <label className="text-2xl flex text-white text-start my-3">Select Hour</label>
                        <input
                            type="time"
                            value={time}
                            onChange={ev => setTime(ev.target.value)}
                            className="input-time text-2xl w-[220px] h-14 px-4 bg-primary border border-white text-white" />
                    </div>

                    <div>
                        <div className="flex items-end justify-between">
                            <label className="text-2xl flex text-white text-start my-3">Number of Guests</label>
                            <p className="text-secondary text-sm my-4">max 5 people</p>
                        </div>
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={ev => setNumberOfGuests(ev.target.value)}
                            className="input-time text-2xl w-[220px] h-14 px-4 bg-primary border border-white text-white" />
                        {/* <div className="relative">
							<span className="arrow"></span>
							<select className="text-2xl w-[220px] h-14 rounded-none m-0 px-4 bg-primary border border-white text-white appearance-none outline-none cursor-pointer">
								<option>1 person</option>
								<option selected>2 people</option>
								<option>3 people</option>
								<option>4 people</option>
								<option>5 people</option>
							</select>
						</div> */}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button onClick={handleAddBookingClick} className="w-[220px] bg-yellow rounded-none text-2xl">Book a Table</button>
                </div>
            </div>
            {showPopup && (
                <div
                    onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-black/80 flex justify-center items-center">
                    <div>
                        <button className="relative top-3 left-[98%]" onClick={() => setShowPopup(false)}>
                            <Cancel />
                        </button>
                        <div 
                            onClick={ev => ev.stopPropagation()}
                            className="bg-white p-1 rounded-2xl flex max-w-5xl max-h-screen overflow-scroll">
                            <div>
                                <h1 className="text-center my-3 text-primary text-3xl">Enter name and phone</h1>
                                <div className="mx-5">
                                    <label>Your name</label>
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={ev => setName(ev.target.value)} />

                                    <label>Phone number</label>
                                    <input 
                                        type="tel" 
                                        value={phoneNumber}
                                        onChange={ev => setPhoneNumber(ev.target.value)} />
                                </div>

                                <div className="flex justify-center">
                                    <button onClick={handleAddBookingClick} className="bg-yellow mb-3 text-xl">Book Table</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}