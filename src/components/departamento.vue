<template>
  <div>
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
    <p style="color: red" v-if="departamentos.id == 0">*Nenhum departamento cadastrado*</p>
    <form id="formularioDepartamento" v-if="!telaPesquisa">
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
    <h3 style="color: red; font-size: 15px">
      <strong>{{ exibirErro }}</strong>
    </h3>
    <hr />
    <button class="btn btn-danger" v-if="departamentos.id != 0">Excluir</button>
    <button class="btn btn-secondary" v-if="departamentos.id != 0">Alterar</button>
    <button class="btn btn-info" v-if="departamentos.id != 0" @click="esconderPesquisa">Pesquisar</button>
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
      erroPesquisa: ""
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
    }
  }
};
</script>

<style>
#formularioDepartamento,
#pesquisa {
  font-size: 20px;
}
table{
    width: 100%;
}
</style>


