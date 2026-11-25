function MatchCard(props) {
    return (
        <div className="match-card">
            <h2>{props.matchName}</h2>

            <p>Date: {props.date}</p>
            <p>Venue: {props.venue}</p>
            <p>Ticket Price: ₹{props.price}</p>

            <button onClick={() => props.onBook(props.matchName)}>
    Book Ticket
</button>
        </div>
    );
}

export default MatchCard;