// REQUEST DATA FROM SERVER

var data;
var url =  document.title.includes("Senate")?"https://api.propublica.org/congress/v1/113/senate/members.json":"https://api.propublica.org/congress/v1/113/house/members.json";
var key = {
    headers: {
        'X-API-Key':'K5YEy3Hs5qyO2ZLDYYRNyT0w4XeAHnU3dMc5uytW'
    }
};

function fetchJson(url, init) {
    return fetch(url, init).then(function(response){
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText)
    });
}

fetchJson(url,key)
    .then(function (json) {
    data = json;
    vue.members = data.results[0].members;
    vue.filter();    
    vue.stateFilter();
    vue.partyData ();
    vue.porcentajes ();
})

//VUE FUNCTIONS
var vue = new Vue({
    el: '#app',
    data: {
        members: [],
        membersFilter: [],
        membersStateFilter: [],
        selectedState: 'All',
        selectedPartys: ['R','D','I'],
        membersGlance: [
            { name: 'Republican', members: [], average: []}, 
            { name: 'Democrat', members: [], average: []}, 
            { name: 'Independent', members: [], average: []},
            { name: 'Total', members: 0, average: 0}
        ],
        loyalty: [
            { membersLeastLoyal: []},
            { membersMostLoyal: []},
            { membersLeastEngaged: []},
            { membersMostEngaged: []}
        ],
    },
     methods: {
        filter: function() {
            var filtered = [];
            for (var i = 0; i < vue.members.length; i++) {
                if (vue.selectedPartys.includes(vue.members[i].party) && vue.selectedState == vue.members[i].state) {
                    filtered.push(vue.members[i]);
                    } else if (vue.selectedPartys.includes(vue.members[i].party) && (vue.selectedState == 'All')) {
                    filtered.push(vue.members[i]);
                    }	
            }
            vue.membersFilter = filtered;
        },
        stateFilter: function() {
            var statesAll = [];
            var states = [];
            for (var i = 0; i < vue.members.length; i++) {
                if (statesAll[vue.members[i].state] === undefined) {
                    statesAll[vue.members[i].state] = 1;
                    states.push(vue.members[i].state);
                }
            }
            vue.membersStateFilter = states;
        },
          partyData: function () { 
            var republicanVotesWithParty = 0;
            var democratVotesWithParty = 0;
            var independentVotesWithParty = 0;

            //MEMBERS
            for (var i = 0; i < vue.members.length; i++) {
                if (vue.members[i].party == 'R') {
                    vue.membersGlance[0].members.push(vue.members[i]); 
                } if (vue.members[i].party == 'D') {
                    vue.membersGlance[1].members.push(vue.members[i]);
                } if (vue.members[i].party == 'I') {
                    vue.membersGlance[2].members.push(vue.members[i]); 
                }                
            }
            //AVERAGE
            for (i = 0; i < vue.membersGlance[0].members.length; i++) {
                republicanVotesWithParty += (vue.membersGlance[0].members[i].votes_with_party_pct || 0);
            } 
            for (i = 0; i < vue.membersGlance[1].members.length; i++) {
                democratVotesWithParty += (vue.membersGlance[1].members[i].votes_with_party_pct || 0);
            }
            for (i = 0; i < vue.membersGlance[2].members.length; i++) {
                independentVotesWithParty += (vue.membersGlance[2].members[i].votes_with_party_pct || 0);                
            }
            
            vue.membersGlance[0].average = (republicanVotesWithParty / (vue.membersGlance[0].members.length != 0 ? vue.membersGlance[0].members.length : 1 )).toFixed(2);
            vue.membersGlance[1].average = (democratVotesWithParty / (vue.membersGlance[1].members.length != 0 ? vue.membersGlance[1].members.length : 1 )).toFixed(2);  
            vue.membersGlance[2].average = (independentVotesWithParty / (vue.membersGlance[2].members.length != 0 ? vue.membersGlance[2].members.length : 1 )).toFixed(2);
        
            //TOTAL
            vue.membersGlance[3].members = vue.members;
            vue.membersGlance[3].average = (((republicanVotesWithParty / vue.membersGlance[0].members.length) + (democratVotesWithParty /   vue.membersGlance[1].members.length) + (independentVotesWithParty / vue.membersGlance[2].members.length))/3 ).toFixed(2);
        },
        porcentajes: function () {
            var leastLoyal = [];
            var mostLoyal = [];
            var leastEngaged = [];
            var mostEngaged = [];

            leastLoyal = ((vue.members.sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct)).slice(-(vue.members.length*10)/100)).reverse();
            vue.loyalty.membersLeastLoyal = leastLoyal;

            mostLoyal = ((vue.members.sort((a,b) => a.votes_with_party_pct - b.votes_with_party_pct)).slice(-(vue.members.length*10)/100)).reverse();
            vue.loyalty.membersMostLoyal = mostLoyal;

            leastEngaged = ((vue.members.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct)).slice(-(vue.members.length*10)/100)).reverse();
            vue.loyalty.membersLeastEngaged = leastEngaged;

            mostEngaged = ((vue.members.sort((a,b) => b.missed_votes_pct - a.missed_votes_pct)).slice(-(vue.members.length*10)/100)).reverse();
            vue.loyalty.membersMostEngaged = mostEngaged;

             }
        }
    })
