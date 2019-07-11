import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        usuarios: {
            id: [],
            nome: [],
            data: [],
            email: [],
            departamento: []
        },
        departamentos: {
            id: [],
            nome: [],
            descricao: []
        },
        todosDepartamentos: []
    }
})