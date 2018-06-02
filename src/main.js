$(document).ready(function() {
  $("#search").submit(function(event) {
    event.preventDefault();
    let doctorName = $("#doctor-search").val();
    let conditionName = $("#condition-search").val();

    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&query=${conditionName}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status !== 200) {
        $(".results").text("An error occured while trying to search for the data you requested, please contact the web administrator for this page.");
      } else {
        $(".results").text("loading...");
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {

      if (response.data != "") {
        $(".results").text(`Below is a list of doctor's meeting your search criteria:`);
        $(".results").append(`<tr><th>Doctor Name</th><th>Accepts New Patients</th><th>Address</th><th>Phone Number</th><th>Website</th></tr>`)
        response.data.forEach(function(doctorData) {
          // console.log(doctorData.practices[0].website);
          // let websiteInfo = function() {  trying to make it so that when a website comes back undefined the return value can be adjusted.  not able to get the function to work
          //   if ((doctorData.practices[0].website) != "") {
          //     return "";
          //   } else {
          //     return doctorData.practices[0].website;
          //   }
          // };
          // console.log(websiteInfo);
          $(".results").append(`<tr><td>${doctorData.profile.last_name}, ${doctorData.profile.first_name}</td><td>${doctorData.practices[0].accepts_new_patients}</td><td>${doctorData.practices[0].visit_address.street} ${doctorData.practices[0].visit_address.city}, ${doctorData.practices[0].visit_address.state_long} ${doctorData.practices[0].visit_address.zip}</td><td>${doctorData.practices[0].phones[0].number}</td><td>${doctorData.practices[0].website}</td></tr>`)
        });
      } else {
        $(".results").text("There were no doctors matching your search criteria.")
      }
    };
  });
});
