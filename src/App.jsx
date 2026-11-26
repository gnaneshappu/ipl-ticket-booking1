
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
    const [selectedMatch, setSelectedMatch] = useState("");
    const [matches, setMatches] = useState([]);
    const [ticketCount, setTicketCount] = useState(1);
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [seatCategory, setSeatCategory] = useState("");

    useEffect(() => {
        async function fetchMatches() {
            const { data, error } = await supabase
                .from("matches")
                .select("*");

            if (error) {
                console.error("Supabase error:", error);
                return;
            }

            const formattedMatches = data.map((match) => ({
                id: match.id,
                matchName: match.match_name,
                date: match.match_date,
                venue: match.venue,
                price: match.price,
                availableSeats: match.available_seats
            }));

            setMatches(formattedMatches);
        }

        fetchMatches();
    }, []);

    const selected = matches.find(
        (match) => match.matchName === selectedMatch
    );

    async function handleBooking() {
        if (!customerName || !email || !seatCategory) {
            alert("Please fill in all booking details.");
            return;
        }

        if (!selected) return;

        if (ticketCount < 1 || ticketCount > selected.availableSeats) {
            alert("Sorry, not enough seats are available.");
            return;
        }

        const totalPrice = selected.price * ticketCount;

        const { error } = await supabase
            .from("bookings")
            .insert([{
                match_id: selected.id,
                customer_name: customerName,
                email: email,
                ticket_count: ticketCount,
                seat_category: seatCategory,
                total_price: totalPrice
            }]);

        if (error) {
            console.error("Booking error:", error);
            alert("Booking failed. Please try again.");
            return;
        }

        const newAvailableSeats = selected.availableSeats - ticketCount;

        const { error: updateError } = await supabase
            .from("matches")
            .update({ available_seats: newAvailableSeats })
            .eq("id", selected.id);

        if (updateError) {
            console.error("Seat update error:", updateError);
            alert("Booking saved, but available seats could not be updated.");
            return;
        }

        setMatches((previousMatches) =>
            previousMatches.map((match) =>
                match.id === selected.id
                    ? { ...match, availableSeats: newAvailableSeats }
                    : match
            )
        );

        alert("Your ticket booking is successful!");

        setCustomerName("");
        setEmail("");
        setSeatCategory("");
        setTicketCount(1);
    }

    return (
        <>
            <Navbar />
            <Hero />

            <h1 id="matches">IPL Match Schedule</h1>

            {selectedMatch && selected && (
                <>
                    <h2>You selected: {selectedMatch}</h2>

                    <div>
                        <h2>Book Your Ticket</h2>

                        <p>Available seats: {selected.availableSeats}</p>
                        <p>Number of tickets: {ticketCount}</p>

                        <p>
                            Total Price: ₹{selected.price * ticketCount}
                        </p>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        <br /><br />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br /><br />

                        <input
                            type="number"
                            min="1"
                            placeholder="Number of tickets"
                            value={ticketCount}
                            onChange={(e) =>
                                setTicketCount(
                                    Math.max(1, Number(e.target.value))
                                )
                            }
                        />
                        <br /><br />

                        <select
                            value={seatCategory}
                            onChange={(e) => setSeatCategory(e.target.value)}
                        >
                            <option value="">Select Seat Category</option>
                            <option value="Regular">Regular</option>
                            <option value="Premium">Premium</option>
                            <option value="VIP">VIP</option>
                        </select>
                        <br /><br />

                        <button onClick={handleBooking}>
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
