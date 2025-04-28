


const checkAndSendEmail = (schedule) => {
    const now = new Date();
    const meetingTime = new Date(`${schedule.Date} ${schedule.Time}`);
  
    const diffInMs = meetingTime - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);
     
  
    if (Math.abs(diffInHours - 1) < 0.01) { 
      
      sendEmail(schedule);
    }
  };
  

  export default checkAndSendEmail;