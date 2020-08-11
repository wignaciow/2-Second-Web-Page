var statisticsObject =
	{	
		republican : [],
		democrat: [],
		independent: [],
		'number_of_republican': 0,
		'number_of_democrat': 0,
		'number_of_independent': 0,
		'average_republicans_votes_own_party' : 0,
		'average_democrat_votes_own_party' : 0,
		'average_independent_votes_own_party' : 0,
		'least_engage' : [],
		'most_engage': [],
		'least_loyal': [],
		'most_loyal' : [],
	};

// GENERAL DATA
var representatives = houseData.results[0].members;

statisticsObject.republican = representatives.filter(representatives => representatives.party == "R");
statisticsObject.democrat = representatives.filter(representatives => representatives.party == "D");
statisticsObject.independent = representatives.filter(representatives => representatives.party == "I");

// TASK: NUMBER OF REPRESENTATIVES PARTY
statisticsObject.number_of_republican = statisticsObject.republican.length;
statisticsObject.number_of_democrat = statisticsObject.democrat.length;
statisticsObject.number_of_independent = statisticsObject.independent.length;

document.getElementById("rNumber").innerHTML = statisticsObject.number_of_republican;
document.getElementById("dNumber").innerHTML = statisticsObject.number_of_democrat;
document.getElementById("iNumber").innerHTML = statisticsObject.number_of_independent;
document.getElementById("total").innerHTML = statisticsObject.republican.length + statisticsObject.democrat.length + statisticsObject.independent.length;

// TASK: AVERAGE OF OWN PARTY VOTES
statisticsObject.average_republican_votes_own_part = (((statisticsObject.republican.map( republican => republican.votes_with_party_pct)).reduce((a,b) => a + b))/statisticsObject.number_of_republican).toFixed(2);
statisticsObject.average_democrat_votes_own_part = (((statisticsObject.democrat.map( democrat => democrat.votes_with_party_pct)).reduce((a,b) => a + b))/statisticsObject.number_of_democrat).toFixed(2);
statisticsObject.average_independent_votes_own_part = 0;
total = ((parseFloat(statisticsObject.average_republican_votes_own_part) + parseFloat(statisticsObject.average_democrat_votes_own_part))/2).toFixed(2);

document.getElementById("rAvgVotedParty").innerHTML = statisticsObject.average_republican_votes_own_part;
document.getElementById("dAvgVotedParty").innerHTML = statisticsObject.average_democrat_votes_own_part;
document.getElementById("iAvgVotedParty").innerHTML = statisticsObject.average_independent_votes_own_part;
document.getElementById("totalAvg").innerHTML = total;

// OTRA FORMA : 
/*	
	var avg = 0;
	for (var i = 0; i < republican.length; i++) {
	  avg += republican[i].votes_with_party_pct;
	}
	var republicanAvgVotesOwnParty = avg/republican.length;
*/

// TASK: REPRESENTATIVES LEAST ENGAGED 
statisticsObject.least_engage = (representatives.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct)).slice(-(representatives.length*10)/100);
var reversedLeastEngaged = statisticsObject.least_engage.reverse();

listLeastEngage(reversedLeastEngaged);

function listLeastEngage(array) {
	var houseLeastEngage = '';
	for (var i = 0; i < array.length; i++) {
		houseLeastEngage += '<tr><td><a href=' + array[i].url + '>' + array[i].last_name + ', '+ array[i].first_name + ' ' + (array[i].middle_name ||'') + '</a></td><td>' + array[i].missed_votes + '</td><td>' + array[i].missed_votes_pct + '</td></tr>';
	}
	if (document.getElementById("leastEngaged") !== null ) {
	document.getElementById("leastEngaged").innerHTML = houseLeastEngage;
	}
}

// TASK: REPRESENTATIVES MOST ENGAGED
rMostEngage = (representatives.sort((a,b) => a.missed_votes_pct + b.missed_votes_pct)).slice(-(representatives.length*10)/100);
var reversed = rMostEngage.reverse();

var resto = (representatives.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct)).slice((representatives.length*10)/100);
var repetido = reversed[reversed.length-1]; 

a = reversed.concat (resto.filter(representatives => representatives.missed_votes_pct == repetido.missed_votes_pct));

listMostEngage(a);

function listMostEngage(array) {
	var houseMostEngage = '';
	for (var i = 0; i < array.length; i++) {
		houseMostEngage += '<tr><td><a href=' + array[i].url + '>' + array[i].last_name + ', '+ array[i].first_name + ' ' + (array[i].middle_name ||'') + '</a></td><td>' + array[i].missed_votes + '</td><td>' + array[i].missed_votes_pct + '</td></tr>';
	}
	if (document.getElementById("mostEngaged") !== null ) {
	document.getElementById("mostEngaged").innerHTML = houseMostEngage;
	}
}

// TASK: REPRESENTATIVES LEAST LOYAL
statisticsObject.least_loyal = (representatives.sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct)).slice(-(representatives.length*10)/100);
console.log(statisticsObject.least_loyal);

var reversedLeastLoyal = statisticsObject.least_loyal.reverse();

listLeastLoyal(reversedLeastLoyal);

function listLeastLoyal(array) {
	var representativeLeastLoyal = '';
	for (var i = 0; i < array.length; i++) {
		representativeLeastLoyal += '<tr><td><a href=' + array[i].url + '>' + array[i].last_name + ', '+ array[i].first_name + ' ' + (array[i].middle_name ||'') + '</a></td><td>' + array[i].total_votes + '</td><td>' + array[i].votes_with_party_pct + '</td></tr>';
	}
	if (document.getElementById("leastLoyal") !== null ) {
	document.getElementById("leastLoyal").innerHTML = representativeLeastLoyal;
	}
}

// TASK: REPRESENTATIVES MOST LOYAL
statisticsObject.most_loyal = (representatives.sort((a,b) => a.votes_with_party_pct - b.votes_with_party_pct)).slice(-(representatives.length*10)/100);
var reversedMostLoyal = statisticsObject.most_loyal.reverse();

listMostLoyal(reversedMostLoyal);

function listMostLoyal(array) {
	var houseMostLoyal = '';
	for (var i = 0; i < array.length; i++) {
		houseMostLoyal += '<tr><td><a href=' + array[i].url + '>' + array[i].last_name + ', '+ array[i].first_name + ' ' + (array[i].middle_name ||'') + '</a></td><td>' + array[i].total_votes + '</td><td>' + array[i].votes_with_party_pct + '</td></tr>';
	}
	if (document.getElementById("mostLoyal") !== null ) {
	document.getElementById("mostLoyal").innerHTML = houseMostLoyal;
	}
}