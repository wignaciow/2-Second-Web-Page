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
        vue.members = json.results[0].members;
        vue.filter();    
        vue.stateFilter(); 
    }).catch(function (error) {
        alert('Appointment not saved: ' + error.message);
    });

//VUE FUNCTIONS
var vue = new Vue({
    el: '#app',
    data: {
        members: [],
        membersFilter: [],
        membersStateFilter: [],
        selectedState: 'All',
        selectedPartys: ['R','D','I']
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
        }
    }
})
