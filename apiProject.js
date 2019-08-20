const baseURL= "https://www.thesportsdb.com/api/v1/json/4012946/searchteams.php";
let url;

const searchTeam= document.getElementById("searchTeam");
const list= document.querySelector(".list");
const search= document.querySelector("form");
const header= document.querySelector("nav");

header.style.diplay= "none";

search.addEventListener('submit', fetchResults);

function fetchResults(e) {
    e.preventDefault();
    url= `${baseURL}?t=${searchTeam.value.split(" ").join(" ")}`;
    console.log(url);
   
    fetch(url).then(function(result){
        console.log(result);
        return result.json();
    }).then(function(json){
        console.log(json);
        displayResults(json);
    });
}

function displayResults(json) {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    let strTeam = json.teams;

    if(strTeam === null) {
        let none = document.createElement("h5");
        header.style.display= "block";
        none.innerText = "no results :(";
        none.style.diplay= "";
        list.appendChild(none);
    } else {
        let strTeam = json.teams.forEach(p => {

            let team = document.createElement("li");
            let intFormedYear = document.createElement("p");
            let strLeague = document.createElement("p");
            let strManager = document.createElement("p");
            let strStadium = document.createElement("p");
            let stadiumLocation = document.createElement("p");
            let intStadiumCapacity = document.createElement("p");
            let strDescriptionEN = document.createElement("p");
            let strTeamBadge = document.createElement("img");

            header.style.display = "block";

            intFormedYear.innerText = `Year Formed: ${p.intFormedYear}`;
            strLeague.innerText = `League: ${p.strLeague}`;
            strManager.innerText = `Manager: ${p.strManager}`;
            strStadium.innerText = `Stadium: ${p.strStadium}`;
            stadiumLocation.innerText = `Stadium Location: ${p.strStadiumLocation}`;
            intStadiumCapacity.innerText = `Stadium Capacity: ${p.intStadiumCapacity}`;
            strDescriptionEN.innerText = `Team Description: ${p.strDescriptionEN}`;
            team.innerText = `${p.strTeam} :`;

            strTeamBadge.src = json.teams[0].strTeamBadge;
            
            list.appendChild(team);
            team.appendChild(strTeamBadge);
            team.appendChild(intFormedYear);
            team.appendChild(strLeague);
            team.appendChild(strManager);
            team.appendChild(strStadium);
            team.appendChild(stadiumLocation);
            team.appendChild(intStadiumCapacity);
            team.appendChild(strDescriptionEN);
            

            team.className="team";
            intFormedYear.className="yearFormed";
            strLeague.className="league";
            strManager.className="manager";
            strStadium.className="stadium";
            stadiumLocation.className="stadiumLocation";
            intStadiumCapacity.className="stadiumCapacity";
            strDescriptionEN.className="description";
            strTeamBadge.className="teamLogo";
        }) 
    }
}
