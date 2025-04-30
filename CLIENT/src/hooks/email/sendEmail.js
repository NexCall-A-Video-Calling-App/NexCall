



const sendEmail = (meeting) => {
    console.log(meeting);

    fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: meeting.email, 
            subject: "Meeting Reminder",
            message: `Reminder for meeting ${meeting.Topic} at ${meeting.Time} on ${meeting.Date}.`,
        }),
    })
    .then((res) => console.log(res))
    .then((result) => console.log(result))
    .catch((error) => console.error('Error:', error));
};



export default sendEmail;