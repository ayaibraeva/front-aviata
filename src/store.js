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
        selectAllAirlines: false,
        selectedAirlines: []
    },
    getters:{
        getAirlineList: state => {
            return state.airlines
        },
        getFlights: state => {


            return state.flights.filter((flight) => {
                if(state.directFlight && flight['itineraries'][0][0]['stops'] !== 0) return false;
                if(state.refundableTicket && !flight['refundable']) return false;
                return state.airlines
            })
        },
        getOption: state => option => state[option],
        getAirlineOption:  state => Object.keys(state.airlines).map((code) => ({
            airline_name: state.airlines[code],
            airline_code: code
        })),


    },
    mutations:{
        showDirectFlights(state){
            state.directFlight = !state.directFlight
            
        },
        showWithBaggage(state){
            state.withBaggage = !state.withBaggage
        },
        showRefundableTickets(state){
            state.refundableTicket = !state.refundableTicket
        },
        showAllAirlines(state){
            state.selectedAirlines = []
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
            state.selectedAirlines.includes(airline) ? commit('removeAirline', airline) : commit('selectAirlines', airline)
        },
        resetOptions({commit}){
            commit('resetOptions')
        }



        

    }
})