import Vue from 'vue'
import Vuex from 'vuex'
import {airlines, flights} from './results.json'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        airlines,
        flights
    },
    getters:{
        getAirlineList: state => {
            return state.airlines
        },
        getFlights: state => {
            return state.flights
        }

    },
    mutations:{

    },
    actions:{

    }
})