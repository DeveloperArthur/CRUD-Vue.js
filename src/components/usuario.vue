<template>
    <div>
        <button class="btn btn-primary" @click="mostrarTelaAdicionar">Adicionar</button>
        <button class="btn btn-primary" @click="mostrarTelaExcluir">Excluir</button>
        <button class="btn btn-primary" @click="mostrarTelaAlterar">Alterar</button>
        <button class="btn btn-primary" @click="mostrarTelaBuscar">Buscar</button>

        <div id="adicionar" v-if="telaAdicionar">
            <p>Adicionar</p>
        </div>

        <div id="excluir" v-if="telaExcluir">
            <p>Excluir</p>
        </div>

        <div id="alterar" v-if="telaAlterar">
            <p>Alterar</p>
        </div>

        <div id="buscar" v-if="telaBuscar">
            <p>Buscar</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            telaAdicionar: false,
            telaExcluir: false,
            telaAlterar: false,
            telaBuscar: false
        }
    },
    methods: {
        mostrarTelaAdicionar(){
            this.telaAdicionar = !this.telaAdicionar;
            this.telaExcluir = false;
            this.telaAlterar = false;
            this.telaBuscar = false;
        },
        mostrarTelaExcluir(){
            this.telaExcluir = !this.telaExcluir;
            this.telaAdicionar = false;
            this.telaAlterar = false;
            this.telaBuscar = false;
        },
        mostrarTelaAlterar(){
            this.telaAlterar = !this.telaAlterar;
            this.telaAdicionar = false;
            this.telaExcluir = false;
            this.telaBuscar = false;
        },
        mostrarTelaBuscar(){
            this.telaBuscar = !this.telaBuscar;
            this.telaAdicionar = false;
            this.telaAlterar = false;
            this.telaExcluir = false;
        }
    }
}
</script>

<style>
    #buscar, #adicionar, #excluir, #alterar{
        font-size: 20px;
    }
</style>


