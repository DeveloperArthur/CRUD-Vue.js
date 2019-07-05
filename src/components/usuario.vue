<template>
    <div>
        <button class="btn btn-primary" @click="mostrarTelaAdicionar">Tela de adicionar</button>
        <button class="btn btn-primary" @click="mostrarTelaExcluir">Tela de excluir</button>
        <button class="btn btn-primary" @click="mostrarTelaAlterar">Tela de alterar</button>
        <button class="btn btn-primary" @click="mostrarTelaBuscar">tela de buscar</button>
        <hr>
        <div id="adicionar" v-if="telaAdicionar">
            {{usuarios}}
            <form>
                <p>Nome:</p>
                <input v-model="nomeUsuario" type="text" placeholder="Digite o nome" style="width:200px; height:30px;">
                <br><br>
                <p>Data de nascimento:</p>
                <input v-model="dataUsuario" type="date" style="width:200px; height:30px;">
                <br><br>
                <p>Email:</p>
                <input v-model="emailUsuario" type="email" placeholder="Digite o email" style="width:200px; height:30px;">
                <br><br>
                <p>Departamento:</p>
                <select v-model="departamentoUsuario" style="width:200px; height:30px;">
                    <option v-for="i in departamento">{{ i }}</option>
                </select>
                <br><br>
                <button class="btn btn-success" @click="adicionar">Adicionar</button>
            </form>
        </div>

        <div id="excluir" v-if="telaExcluir">
            <input type="text" placeholder="ID para excluir">
            <button class="btn btn-danger">Excluir</button>
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
            telaBuscar: false,
            departamento: ['Suporte', 'Salesforce', 'Desenvolvimento'],
            usuarios:{
                id: [],
                nome: [],
                data: [],
                email: [],
                departamento: []
            },
            i: 0,
            nomeUsuario: '',
            dataUsuario: '',
            emailUsuario: '',
            departamentoUsuario: ''
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
        },
        adicionar(){
            this.usuarios.id.push(this.i++);
            this.usuarios.nome.push(this.nomeUsuario);
            this.usuarios.data.push(this.dataUsuario);
            this.usuarios.email.push(this.emailUsuario);
            this.usuarios.departamento.push(this.departamentoUsuario);
            alert('Usuario adicionado');
        }
    }
}
</script>

<style>
    #buscar, #adicionar, #excluir, #alterar{
        font-size: 20px;
    }
</style>


