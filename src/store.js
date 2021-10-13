import Vue from 'vue'
import Vuex from 'vuex'
import {airlines, flights} from './results.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        airlines,
        flights,
        directFlight: false,
        withBaggage: false,
        refundableTicket: false,
        selectAllAirlines: true,
        selectedAirlines: []
    },
    getters:{
        getFlights: state => {
            return state.flights.filter((flight) => {
                if(state.directFlight && flight['itineraries'][0][0]['stops'] !== 0){
                    return false;
                }
                if(state.refundableTicket && !flight['refundable']) return false;
                return state.selectAllAirlines ? true : state.selectedAirlines.length > 0 && state.selectedAirlines.includes(flight['itineraries'][0][0]['carrier'])
            })
        },
        getOption: state => option => state[option],
        getAirlineList:  state => Object.keys(state.airlines).map((code) => ({
            airline_name: state.airlines[code],
            airline_code: code
        })),
        getAirlineOption: state => airline => state.selectedAirlines.includes(airline)


    },
    mutations:{
        showDirectFlights(state){
            state.directFlight = !state.directFlight
            console.log(state.directFlight)
        },
        showWithBaggage(state){
            state.withBaggage = !state.withBaggage
        },
        showRefundableTickets(state){
            state.refundableTicket = !state.refundableTicket
        },
        showAllAirlines(state){
            state.selectAllAirlines = !state.selectAllAirlines
            state.selectedAirlines = []
        },
        notSelectAllAirlines(state){
            state.selectAllAirlines = false
        },
        selectAirlines(state, airline){
            state.selectedAirlines.push(airline)
        },
        removeAirline(state, airline){
            state.selectedAirlines.splice(state.selectedAirlines.indexOf(airline), 1)
        },
        resetOptions(state){
            state.directFlight = false,
            state.withBaggage = false,
            state.refundableTicket = false,
            state.selectAllAirlines =true,
            state.selectedAirlines = []
        }
        

    },
    actions:{
        showDirectFlights({commit}){
            commit('showDirectFlights')
        },
        showWithBaggage({commit}){
            commit('showWithBaggage')
        },
        showRefundableTickets({commit}){
            commit('showRefundableTickets')
        },
        showAllAirlines({commit}){
            commit('showAllAirlines')
        },
        showAirline({state, commit}, airline){
            if(state.selectAllAirlines) commit('showAllAirlines')
            state.selectedAirlines.includes(airline) ? commit('removeAirline', airline) : commit('selectAirlines', airline)
        },
        resetOptions({commit}){
            commit('resetOptions')
        }

    }
})