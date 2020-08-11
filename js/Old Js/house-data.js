// Title of Thead
var theadTr = '<td>Full Name</td><td>Party</td><td>State</td><td>Seniority</td><td>% Votes w/Party</td>';
document.getElementById("dataHeader").innerHTML = theadTr;

// Body Content
var representatives = houseData.results[0].members;
console.log(representatives);

// Task Party Filter && State Filter
filterList()
document.getElementById("R").onclick = filterList;
document.getElementById("D").onclick = filterList;
document.getElementById("I").onclick = filterList;
document.getElementById("states").onchange = filterList; 

function filterList () {
	var check = Array.from(document.querySelectorAll('input[name=partyCheckbox]:checked')).map(elt => elt.value);
	var state = document.getElementById('states').value;
	var filtered = [];


	for (var i = 0; i < representatives.length; i++) {
		 if (check.includes(representatives[i].party) && state == 'All') {
			filtered.push(representatives[i]);
			} else if (check.includes(representatives[i].party) && state =='') {
			filtered.push(representatives[i]);
			} else if (check.includes(representatives[i].party) && state == representatives[i].state) {
			filtered.push(representatives[i]);
			}	
	}
	houseList(filtered);		
}

function houseList (array) {
	var newHouseData = '';
	
	for (var i = 0; i < array.length; i++) {
	newHouseData += '<tr><td><a href=' + array[i].url + '>' + array[i].last_name + ', '+ array[i].first_name + ' ' + (array[i].middle_name ||'') + '</a></td><td>' + array[i].party + '</td><td>' + array[i].state + '</td><td>' + array[i].seniority + '</td><td>' + array[i].votes_with_party_pct + '</td></tr>';
	}	
	document.getElementById("houseData").innerHTML = newHouseData;
}

// Task States Filter
var representatives = houseData.results[0].members;

function statesNames(representatives) {
	
   	var statesUSA = [];
    var states = "";
    states += '<option name=state value="All">All</option>';

    for (var i = 0; i < representatives.length; i++) {
        if (statesUSA[representatives[i].state] === undefined) {
            statesUSA[representatives[i].state] = 1;
            states += '<option name=state value="' + representatives[i].state + '">' + representatives[i].state + '</option>';
        }
    }
    return states;
}

document.getElementById("states").innerHTML = statesNames(representatives);

