


const sendEmail = (schedule)=>{

    // use web3forms

    const  formData = {
        access_key:"c9772aaf-2a17-49f6-92db-8373d78f892d",
        subject:"Meeting Reminder",
        from_name:"NexCall",
        name:schedule.Topic,
        email:schedule.email,
        message: `Reminder: Meeting "${schedule.Topic}" is at ${schedule.Time} on ${schedule.Date}.`,



    }



}



