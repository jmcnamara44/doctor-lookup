$(document).ready(function() {
  $("#search").submit(function(event) {
    event.preventDefault();
    let doctorName = $("#doctor-search").val();
    // let conditionName = $("#condition-search").val();

    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status !== 200) {
        $(".results").text("error");
      } else {
        $(".results").text("loading");
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      $(".results").text(`Below is a list of doctor's meeting your search criteria:`);
      $(".results").append(`<tr><th>Doctor Name</th><th>Accepts New Patients</th><th>Address</th><th>Phone Number</th><th>Website</th></tr>`)
      response.data.forEach(function(doctorData) {
        $(".results").append(`<tr><td>${doctorData.profile.last_name}, ${doctorData.profile.first_name}</td><td>${doctorData.practices[0].accepts_new_patients}</td><td>${doctorData.practices[0].visit_address.street} ${doctorData.practices[0].visit_address.city}, ${doctorData.practices[0].visit_address.state_long} ${doctorData.practices[0].visit_address.zip}</td><td>${doctorData.practices[0].phones[0].number}</td><td>${doctorData.practices[0].website}</td></tr>`)

        // doctorData.practices.forEach(function(practice) {
        //   $(".results").append(`<tr><td>${practice.name}</td><td>${practice.accepts_new_patients}</td><td>${practice.visit_address.street} ${practice.visit_address.city}, ${practice.visit_address.state_long} ${practice.visit_address.zip}</td><td>${practice.phones[0].number}</td><td>${practice.website}</td></tr>`)
        //
        // });
      });
    }
  });
});
