<template>
    <div>
        <button class="btn btn-secondary" @click="mostrarTelaAdicionar">Tela de adicionar</button>
        <button class="btn btn-secondary" @click="mostrarTelaExcluir">Tela de excluir</button>
        <button class="btn btn-secondary" @click="mostrarTelaAlterar">Tela de alterar</button>
        <button class="btn btn-secondary" @click="mostrarTelaBuscar">Tela de buscar</button>
        <hr>
        <div id="adicionar" v-if="telaAdicionar">
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
                    <option v-for="i in departamentosCadastrados">{{ i }}</option>
                </select>
                <br><br>
                <button class="btn btn-primary" @click="adicionar">Adicionar</button>
                <h3 style="color: red; font-size: 15px">
                    <strong>{{ erroInputVazioAdicionar }}</strong>
                </h3> 
            </form>
        </div>

        <div id="excluir" v-if="telaExcluir">
            <p>Digite o ID do Usuario que deseja excluir</p>
            <input type="text" placeholder="ID para excluir" v-model="excluirID">
            <button class="btn btn-danger" @click="excluir">Excluir</button>
            <br>
            <h3 style="color: red; font-size: 15px">
                <strong>{{ erroExcluir }}</strong>
            </h3>
        </div>

        <div id="alterar" v-if="telaAlterar">
            <p>Digite o ID do Usuario que deseja alterar</p>
            <input type="text" placeholder="ID para Alterar" v-model="alterarID"  style="width:200px; height:30px;"/>
            <button class="btn btn-secondary" @click="procurarUsuarioParaAlterar">Procurar</button>
            <h3 style="color: red; font-size: 15px">
                <strong>{{ erroAoProcurar }}</strong>
            </h3>
            <p>{{ nomeAtual }}</p>
            <p>{{ dataAtual }}</p>
            <p>{{ emailAtual }}</p>
            <p>{{ departamentoAtual }}</p>
            <hr>
            <div>
                <p>Digite o novo nome</p>
                <input type="text" placeholder="novo nome" v-model="novoNome"  style="width:200px; height:30px;"/>
                <h3 style="color: red; font-size: 15px">
                    <strong>{{ erroNovoNome }}</strong>
                </h3>
                <p>Digite a nova data</p>
                <input type="date" placeholder="nova data" v-model="novaData"  style="width:200px; height:30px;"/>
                <h3 style="color: red; font-size: 15px">
                    <strong>{{ erroNovaData }}</strong>
                </h3>
                <p>Digite o novo email</p>
                <input type="text" placeholder="novo email" v-model="novoEmail"  style="width:200px; height:30px;">
                <h3 style="color: red; font-size: 15px">
                    <strong>{{ erroNovoEmail }}</strong>
                </h3>
                <p>Digite o novo departamento</p>
                <select v-model="departamentoUsuario" style="width:200px; height:30px;">
                    <option v-for="i in departamentosCadastrados">{{ i }}</option>
                </select>
                <h3 style="color: red; font-size: 15px">
                    <strong>{{ erroNovoDepartamento }}</strong>
                </h3>
                <button class="btn btn-warning" @click="alterar">Alterar</button>
            </div>
        </div>

        <div id="buscar" v-if="telaBuscar">
            <input type="text" placeholder="Digite o ID p/ alteração" v-model="buscarID" />
            <button class="btn btn-secondary" @click="pesquisar">Procurar</button>
            <h3 style="color: red; font-size: 15px">
                <strong>{{ erroPesquisa }}</strong>
            </h3> 
            <table border="1">
                <tr>
                    <th>Nome</th>
                    <th>Data do cadastro</th>
                    <th>Email</th>
                    <th>Departamento</th>
                </tr>
                <tr>
                    <td>{{nomePesquisa}}</td>
                    <td>{{dataPesquisa}}</td>
                    <td>{{emailPesquisa}}</td>
                    <td>{{departamentoPesquisa}}</td>
                </tr>
            </table>
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
            /*usuarios:{
                id: [],
                nome: [],
                data: [],
                email: [],
                departamento: []
            }*/
            i: 1,
            nomeUsuario: '',
            dataUsuario: '',
            emailUsuario: '',
            departamentoUsuario: '',
            excluirID: 0,
            erroExcluir: '',
            buscarID: 0,
            erroPesquisa: '',
            nomePesquisa: '',
            dataPesquisa: '',
            emailPesquisa: '',
            departamentoPesquisa: '',
            alterarID: 0,
            erroAoProcurar: '',
            nomeAtual: '',
            departamentoAtual: '',
            emailAtual: '',
            dataAtual: '',
            novoNome: '',
            novaData: '',
            novoEmail: '',
            erroInputVazioAdicionar: '',
            erroNovoNome: '',
            erroNovaData: '',
            erroNovoEmail: '',
            erroNovoDepartamento: ''
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
            if(this.nomeUsuario.length == 0 || this.dataUsuario.length == 0 || this.emailUsuario.length == 0 || this.departamentoUsuario.length == 0){
                this.erroInputVazioAdicionar = "Preencha todos os campos";
            }else{
                this.erroInputVazioAdicionar = "";
                this.$store.state.usuarios.id.push(this.i++);
                this.$store.state.usuarios.nome.push(this.nomeUsuario);
                this.$store.state.usuarios.data.push(this.dataUsuario);
                this.$store.state.usuarios.email.push(this.emailUsuario);
                this.$store.state.usuarios.departamento.push(this.departamentoUsuario);
                alert('Usuario adicionado');
                this.nomeUsuario = '';
                this.dataUsuario = '';
                this.emailUsuario = '';
                this.departamentoUsuario = '';
            }
        },
        excluir(){
            if(this.$store.state.usuarios.id.length == 0){
                this.erroExcluir = 'Usuario nao encontrado';
            }
            for (var i = 0; i < this.$store.state.usuarios.id.length; i++) {
                if (this.$store.state.usuarios.id[i] == this.excluirID) {
                    this.erroExcluir = '';
                    this.$store.state.usuarios.id[i] = null;
                    this.$store.state.usuarios.nome[i] = null;
                    this.$store.state.usuarios.data[i] = null;
                    this.$store.state.usuarios.email[i] = null;
                    this.$store.state.usuarios.departamento[i] = null;
                    alert('Usuario excluido!');
                    break;
                }else{
                    this.erroExcluir = 'Usuario nao encontrado';
                }
            }
        },
        pesquisar(){
            if(this.$store.state.usuarios.id.length == 0){
                this.erroPesquisa = 'Usuario inexistente';
            }
            for (var i = 0; i < this.$store.state.usuarios.id.length; i++) {
                if (this.$store.state.usuarios.id[i] == this.buscarID) {
                    this.erroPesquisa = "";
                    this.nomePesquisa = this.$store.state.usuarios.nome[i];
                    this.dataPesquisa = this.$store.state.usuarios.data[i];
                    this.emailPesquisa = this.$store.state.usuarios.email[i];
                    this.departamentoPesquisa = this.$store.state.usuarios.departamento[i];
                    break;
                } else {
                    this.erroPesquisa = "Usuario inexistente";
                    this.nomePesquisa = '';
                    this.dataPesquisa = '';
                    this.emailPesquisa = '';
                    this.departamentoPesquisa = '';
                }
            }
        },
        procurarUsuarioParaAlterar(){
            if(this.$store.state.usuarios.id.length == 0){
                this.erroAoProcurar = 'Usuario inexistente';
            }
            for (var i = 0; i < this.$store.state.usuarios.id.length; i++) {
                if (this.$store.state.usuarios.id[i] == this.alterarID) {
                    this.erroAoProcurar = "";
                    this.nomeAtual = "Nome: "+this.$store.state.usuarios.nome[i];
                    this.dataAtual = "Data do cadastro: "+this.$store.state.usuarios.data[i];
                    this.emailAtual = "Email: "+this.$store.state.usuarios.email[i];
                    this.departamentoAtual = "Departamento: "+this.$store.state.usuarios.departamento[i];
                    break;
                }else{
                    this.nomeAtual = "";
                    this.dataAtual = "";
                    this.emailAtual = "";
                    this.departamentoAtual = "";
                    this.erroAoProcurar = "Usuario nao encontrado";
                }
            }
        },
        alterar(){
            if(this.alterarID == 0){
                alert('Busque o ID que deseja alterar');
            }
            if(this.novoNome.length == 0){
                this.erroNovoNome = "Preencha o nome";
            } 
            if(this.novaData.length == 0){
                this.erroNovaData = "Preencha a data";
            } 
            if(this.novoEmail.length == 0){
                this.erroNovoEmail = "Preencha o email";
            }
            if(this.departamentoUsuario.length == 0){
                this.erroNovoDepartamento = "Preencha o departamento";  
            }else{
                this.erroNovoNome = "";
                this.erroNovaData = "";
                this.erroNovoEmail = "";
                this.erroNovoDepartamento = "";
                for (var i = 0; i < this.$store.state.usuarios.id.length; i++) {
                    if (this.$store.state.usuarios.id[i] == this.alterarID) {
                        this.$store.state.usuarios.nome[i] = this.novoNome;
                        this.$store.state.usuarios.data[i] = this.novaData;
                        this.$store.state.usuarios.email[i] = this.novoEmail;
                        this.$store.state.usuarios.departamento[i] = this.departamentoUsuario;
                        this.nomeAtual = "";
                        this.departamentoAtual = "";
                        this.emailAtual = "";
                        this.dataAtual = "";
                        this.novoNome = "";
                        this.novaData = "";
                        this.novoEmail = "";
                        this.departamentoUsuario = "";
                        this.erroInputVazioAlterar = "";
                        alert('Campos alterados');
                        break;
                    }
                }
            }
        }
    },
    computed:{
        usuarios(){
            return this.$store.state.usuarios;
        },
        departamentosCadastrados(){
            return this.$store.state.todosDepartamentos;
        }
    }
}
</script>

<style>
    #buscar, #adicionar, #excluir, #alterar{
        font-size: 20px;
    }
    table{
        width: 100%;
    }
</style>