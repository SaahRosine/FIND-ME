let notifications = JSON.parse(localStorage.getItem("fm_notifications") || "[]");


notifications.push({
  title: "Consultation Accepted",
  message: "Your consultation request at your choosen Hospital was approved.",
  time: new Date().toLocaleString()
});


notifications.push({
  title: "New Reply",
  message: "Admin replied: 'Please come at 10 AM tomorrow.'",
  time: new Date().toLocaleString()
});

localStorage.setItem("fm_notifications", JSON.stringify(notifications));
