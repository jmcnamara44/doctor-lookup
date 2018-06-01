$(document).ready(function() {
  $("#search").click(function() {
    let doctorName = $("#doctor-search").val();
    let conditionName = $("#condition-search").val();

    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=jeremy&user_key=${process.env.API_KEY}`

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      $("#results").text(`Below is a list of doctor's meeting your search criteria: ${response.practies.name}`)
    }
  });
});
