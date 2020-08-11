// REQUEST DATA FROM SERVER
fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
    headers: new Headers({
        'X-API-Key':'K5YEy3Hs5qyO2ZLDYYRNyT0w4XeAHnU3dMc5uytW'
        })
    }).then(function(response){
        if (response.ok) {
        return response.json();
        }
        throw new Error(response.statusText);
    }).then(function(json) {
        vue.senators = json.results[0].members; 
        vue.partyData ();
        vue.porcentajes ();
    }).catch(function (error) {
        alert('Appointment not saved: ' + error.message);
    });


//VUE FUNCTIONS
var vue = new Vue({
    el: '#app',
    data: {
        senators: [],
        senateGlance: [
            { name: 'Republican', members: [], average: []}, 
            { name: 'Democrat', members: [], average: []}, 
            { name: 'Independent', members: [], average: []},
            { name: 'Total', members: 0, average: 0}
        ],
        loyalty: [
            { senatorsLeastLoyal: []},
            { senatorsMostLoyal: []},
            { senatorsLeastEngaged: []},
            { senatorsMostEngaged: []}
        ],
    },
    methods: {
        partyData: function () { 
            var republicanVotesWithParty = 0;
            var democratVotesWithParty = 0;
            var independentVotesWithParty = 0;
            
            //MEMBERS
            for (var i = 0; i < vue.senators.length; i++) {
                if (vue.senators[i].party == 'R') {
                    vue.senateGlance[0].members.push(vue.senators[i]); 
                } if (vue.senators[i].party == 'D') {
                    vue.senateGlance[1].members.push(vue.senators[i]);
                } if (vue.senators[i].party == 'I') {
                    vue.senateGlance[2].members.push(vue.senators[i]); 
                }                
            }
            //AVERAGE
            for (i = 0; i < vue.senateGlance[0].members.length; i++) {
                republicanVotesWithParty += vue.senateGlance[0].members[i].votes_with_party_pct;
            } 
            for (i = 0; i < vue.senateGlance[1].members.length; i++) {
                democratVotesWithParty += vue.senateGlance[1].members[i].votes_with_party_pct;
            }
            for (i = 0; i < vue.senateGlance[2].members.length; i++) {
                independentVotesWithParty += vue.senateGlance[2].members[i].votes_with_party_pct;
            }             
            
            vue.senateGlance[0].average = (republicanVotesWithParty / vue.senateGlance[0].members.length).toFixed(2);
            vue.senateGlance[1].average = (democratVotesWithParty / vue.senateGlance[1].members.length).toFixed(2);
            vue.senateGlance[2].average = (independentVotesWithParty / vue.senateGlance[2].members.length).toFixed(2);
            
            //TOTAL
            vue.senateGlance[3].members = vue.senators;
            vue.senateGlance[3].average = (((republicanVotesWithParty / vue.senateGlance[0].members.length) + (democratVotesWithParty / vue.senateGlance[1].members.length) + (independentVotesWithParty / vue.senateGlance[2].members.length))/3).toFixed(2);
        },
        porcentajes: function () {
            var leastLoyal = [];
            var mostLoyal = [];
            var leastEngaged = [];
            var mostEngaged = [];
    
            leastLoyal = ((vue.senators.sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct)).slice(-(vue.senators.length*10)/100)).reverse();
            vue.loyalty.senatorsLeastLoyal = leastLoyal;
            
            mostLoyal = ((vue.senators.sort((a,b) => a.votes_with_party_pct - b.votes_with_party_pct)).slice(-(vue.senators.length*10)/100)).reverse();
            vue.loyalty.senatorsMostLoyal = mostLoyal;
            
            leastEngaged = ((vue.senators.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct)).slice(-(vue.senators.length*10)/100)).reverse();
            vue.loyalty.senatorsLeastEngaged = leastEngaged;
            
            mostEngaged = ((vue.senators.sort((a,b) => b.missed_votes_pct - a.missed_votes_pct)).slice(-(vue.senators.length*10)/100)).reverse();
            vue.loyalty.senatorsMostEngaged = mostEngaged;

             }
    }
})

