
import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
    const [selectedMatch, setSelectedMatch] = useState("");
    const [ticketCount, setTicketCount] = useState(1);

    const matches = [
        {
            id: 1,
            matchName: "RCB vs CSK",
            date: "10 April 2026",
            venue: "Bengaluru",
            price: 1000
        },
        {
            id: 2,
            matchName: "MI vs KKR",
            date: "12 April 2026",
            venue: "Mumbai",
            price: 1200
        },
        {
            id: 3,
            matchName: "KKR vs RCB",
            date: "15 April 2026",
            venue: "Kolkata",
            price: 1500
        }
    ];

    const selected = matches.find(
        (match) => match.matchName === selectedMatch
    );

    return (
        <>
            <Navbar />
            <Hero />

            <h1 id="matches">IPL Match Schedule</h1>

            {selectedMatch && (
                <>
                    <h2>You selected: {selectedMatch}</h2>

                    <div>
                        <h2>Book Your Ticket</h2>

                        <p>Number of tickets: {ticketCount}</p>

                        <p>
                            Total Price: ₹{selected.price * ticketCount}
                        </p>

                        <input type="text" placeholder="Enter your name" />
                        <br /><br />

                        <input type="email" placeholder="Enter your email" />
                        <br /><br />

                        <input
                            type="number"
                            min="1"
                            placeholder="Number of tickets"
                            value={ticketCount}
                            onChange={(e) =>
                                setTicketCount(Math.max(1, Number(e.target.value)))
                            }
                        />
                        <br /><br />

                        <select>
                            <option value="">Select Seat Category</option>
                            <option value="Regular">Regular</option>
                            <option value="Premium">Premium</option>
                            <option value="VIP">VIP</option>
                        </select>
                        <br /><br />

                        <button onClick={() => alert("Your ticket booking is successful!")}>
                            Confirm Booking
                        </button>
                    </div>
                </>
            )}

            {matches.map((match) => (
                <MatchCard
                    key={match.id}
                    matchName={match.matchName}
                    date={match.date}
                    venue={match.venue}
                    price={match.price}
                    onBook={setSelectedMatch}
                />
            ))}

            <footer>
                <p>© 2026 IPL Ticket Booking. All Rights Reserved.</p>
                <p>Enjoy the excitement of cricket!</p>
            </footer>
        </>
    );
}

export default App;
