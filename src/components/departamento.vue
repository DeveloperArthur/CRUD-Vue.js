<template>
  <div>
    <!-- PESQUISA -->
    <div id="pesquisa" v-if="telaPesquisa">
      <input type="text" placeholder="Digite o ID" v-model="buscarID" />
      <button class="btn btn-secondary" @click="pesquisar">Buscar</button>
      <h3 style="color: red; font-size: 15px">
        <strong>{{ erroPesquisa }}</strong>
      </h3>
      <table border="1">
        <tr>
          <th>Departamento</th>
          <th>Descrição</th>
        </tr>
        <tr>
          <td>{{pesquisaDepartamento}}</td>
          <td>{{pesquisaDescricao}}</td>
        </tr>
      </table>
    </div>

    <!-- EXCLUIR -->
    <div id="excluir" v-if="telaExcluir">
      <input type="text" placeholder="ID para excluir" v-model="excluirID" />
      <button class="btn btn-danger" @click="excluir">Excluir</button>
      <h3 style="color: red; font-size: 15px">
        <strong>{{ erroExcluir }}</strong>
      </h3>
    </div>

    <!-- ALTERAR -->
    <div id="alterar" v-if="telaAlterar">
      <input type="text" placeholder="ID para Alterar" v-model="alterarID" />
      <button class="btn btn-secondary" @click="alterar">Buscar</button>
      <h3 style="color: red; font-size: 15px">
        <strong>{{ erroAlterar }}</strong>
      </h3>
      <h3>{{ departamentoAtualAlterar }}</h3>
      <h3>{{ descricaoAtualAlterar }}</h3>
      <hr>
      <div>
          <p>Digite a alteração para Departamento</p>
          <input type="text" placeholder="Alteração departamento" v-model="novoDepartamento" />
          <br>
          <p>Digite a alteração para descrição</p>
          <input type="text" placeholder="Alteração descrição" v-model="novaDescricao" />
          <br><br>
          <button class="btn btn-warning" @click="alterarCampos">Alterar</button>
      </div>
    </div>

    <!-- ADICIONAR -->
    <p style="color: red" v-if="departamentos.id == 0">*Nenhum departamento cadastrado*</p>
    <form id="formularioDepartamento" v-if="telaAdicionar">
      <p id="nome">Departamento:</p>
      <input v-model="nomeDepartamento" placeholder="Digite o departamento" type="text" />
      <br />
      <br />
      <p id="descricao">Descrição:</p>
      <input type="text" placeholder="Digite a descricao" v-model="descricaoDepartamento" />
      <br />
      <br />
      <button class="btn btn-primary" @click="adicionar()">Adicionar</button>
    </form>

    <!-- BOTOES -->
    <h3 style="color: red; font-size: 15px">
      <strong>{{ exibirErro }}</strong>
    </h3>
    <hr />
    <button class="btn btn-secondary" v-if="departamentos.id != 0" @click="esconderExcluir">Tela de excluir</button>
    <button class="btn btn-secondary" v-if="departamentos.id != 0" @click="esconderAlterar">Tela de alterar</button>
    <button class="btn btn-secondary" v-if="departamentos.id != 0" @click="esconderPesquisa">Tela de pesquisar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departamentos: {
        id: [],
        nome: [],
        descricao: []
      },
      nomeDepartamento: "",
      descricaoDepartamento: "",
      exibirErro: "",
      i: 1,
      pesquisaDepartamento: "",
      pesquisaDescricao: "",
      telaPesquisa: false,
      buscarID: 0,
      erroPesquisa: "",
      excluirID: 0,
      erroExcluir: '',
      telaExcluir: false,
      telaAdicionar: true,
      telaAlterar: false,
      departamentoAtualAlterar: "",
      descricaoAtualAlterar: "",
      erroAlterar: "",
      alterarID: 0,
      novoDepartamento: "",
      novaDescricao: ""
    };
  },
  methods: {
    adicionar() {
      if (this.nomeDepartamento.length == 0 || this.descricaoDepartamento.length == 0) {
        this.exibirErro = "Preencha todos os campos!!";
      } else {
        this.exibirErro = "";
        this.departamentos.id.push(this.i++);
        this.departamentos.nome.push(this.nomeDepartamento);
        this.departamentos.descricao.push(this.descricaoDepartamento);
        alert("Departamento adicionado!");
        this.nomeDepartamento = "";
        this.descricaoDepartamento = "";
      }
    },
    pesquisar() {
      for (var i = 0; i < this.departamentos.id.length; i++) {
        if (this.departamentos.id[i] == this.buscarID) {
            this.erroPesquisa = "";
            this.pesquisaDepartamento = this.departamentos.nome[i];
            this.pesquisaDescricao = this.departamentos.descricao[i];
            break;
        } else {
            this.erroPesquisa = "Departamento nao encontrado";
            this.pesquisaDepartamento = "";
            this.pesquisaDescricao = "";
        }
      }
    },
    esconderPesquisa() {
      this.telaPesquisa = !this.telaPesquisa;
      this.telaExcluir = false;
      this.telaAdicionar = !this.telaAdicionar;
      this.telaAlterar = false;
    },
    excluir(){
        for (var i = 0; i < this.departamentos.id.length; i++) {
            if (this.departamentos.id[i] == this.excluirID) {
                this.erroExcluir = "";
                this.departamentos.id[i] = null;
                this.departamentos.nome[i] = null;
                this.departamentos.descricao[i] = null;
                alert('Departamento excluido!');
                break;
            }else{
                this.erroExcluir = "Departamento nao encontrado";
            }
        }
    },
    esconderExcluir(){
        this.telaExcluir = !this.telaExcluir;
        this.telaPesquisa = false;
        this.telaAdicionar = !this.telaAdicionar;
        this.telaAlterar = false;
    },
    esconderAlterar(){
        this.telaAlterar = !this.telaAlterar;
        this.telaExcluir = false;
        this.telaPesquisa = false;
        this.telaAdicionar = !this.telaAdicionar;
    },
    alterar(){
        for (var i = 0; i < this.departamentos.id.length; i++) {
            if (this.departamentos.id[i] == this.alterarID) {
                this.erroAlterar = "";
                this.descricaoAtualAlterar = "Descrição: "+this.departamentos.descricao[i];
                this.departamentoAtualAlterar = "Departamento: "+this.departamentos.nome[i];
                break;
            }else{
                this.descricaoAtualAlterar = "";
                this.departamentoAtualAlterar = "";
                this.erroAlterar = "Departamento nao encontrado";
            }
        }
    },
    alterarCampos(){
        for (var i = 0; i < this.departamentos.id.length; i++) {
            if (this.departamentos.id[i] == this.alterarID) {
                this.departamentos.descricao[i] = this.novaDescricao;
                this.departamentos.nome[i] = this.novoDepartamento;
                this.descricaoAtualAlterar = "";
                this.departamentoAtualAlterar = "";
                this.novaDescricao = "";
                this.novoDepartamento = "";
                alert('Campos alterados');
                break;
            }
        }
    }
  }
};
</script>

<style>
#formularioDepartamento,
#pesquisa, #excluir, #alterar {
  font-size: 20px;
}
table{
    width: 100%;
}
</style>


