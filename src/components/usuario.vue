<template>
  <div align="center" id="tudo">
    <div v-if="mostrarAlterar">
      <form>
        <td>
          <input v-model="nomeUsuario" type="text" placeholder="Digite o nome" />
        </td>
        <td>
          <input v-model="dataUsuario" type="date" />
        </td>
        <td>
          <input v-model="emailUsuario" type="email" placeholder="Digite o email" />
        </td>
        <td>
          <select v-model="departamentoUsuario" style="width:295px; height:34px;">
            <option v-for="i in departamentosCadastrados">{{ i }}</option>
          </select>
        </td>
        <td>
          <button class="btn btn-primary" @click="adicionar">Adicionar</button>
        </td>
        <h3 style="color: red; font-size: 15px">
          <strong>{{ erroInputVazioAdicionar }}</strong>
        </h3>
      </form>
      <hr />
      <td>
        <input
          id="inputBusca"
          v-model="pesquisa"
          placeholder="Digite o que deseja buscar"
          type="text"
        />
      </td>
      <td>
        <button class="btn btn-secondary" @click="pesquisar">Buscar</button>
      </td>
      <br />
      <table border="1" v-if="esconderTabelaPrincipal">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Data de cadastro</th>
          <th>Email</th>
          <th>Departamento</th>
          <th>Aplicações</th>
        </tr>
        <tr v-for="(id, index) in $store.state.usuarios.id">
          <td>{{id}}</td>
          <td>{{$store.state.usuarios.nome[index]}}</td>
          <td>{{$store.state.usuarios.data[index]}}</td>
          <td>{{$store.state.usuarios.email[index]}}</td>
          <td>{{$store.state.usuarios.departamento[index]}}</td>
          <td>
            <button class="btn btn-success" @click="mostrarTelaAlterar(index)">Alterar</button>
            <button class="btn btn-danger" @click="excluir(index)">Excluir</button>
          </td>
        </tr>
      </table>
      <table border="1" v-if="!esconderTabelaPrincipal">
        <p>Resultado da busca:</p>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Data de cadastro</th>
          <th>Email</th>
          <th>Departamento</th>
          <th>Aplicações</th>
        </tr>
        <tr v-if="pesquisaAchou">
          <td>{{pesquisaId}}</td>
          <td>{{pesquisaNome}}</td>
          <td>{{pesquisaData}}</td>
          <td>{{pesquisaEmail}}</td>
          <td>{{pesquisaDepartamento}}</td>
          <td>
            <button class="btn btn-success" @click="mostrarTelaAlterarNaBusca()">Alterar</button>
            <button class="btn btn-danger" @click="excluirNaPesquisa()">Excluir</button>
          </td>
        </tr>
        <h3 style="color: red; font-size: 15px" v-if="!pesquisaAchou">
          <strong>{{ erroPesquisa }}</strong>
        </h3>
      </table>
    </div>

    <!-- TELA DE ALTERAÇÃO -->
    <div v-if="!mostrarAlterar">
      <table border="1">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Data de cadastro</th>
          <th>Email</th>
          <th>Departamento</th>
        </tr>
        <tr>
          <td>{{idAtualAlterar}}</td>
          <td>{{nomeAtualAlterar}}</td>
          <td>{{dataAtualAlterar}}</td>
          <td>{{emailAtualAlterar}}</td>
          <td>{{departamentoAtualAlterar}}</td>
        </tr>
      </table>
      <hr />
      <div>
        <input type="text" placeholder="Alterar Nome" v-model="novoNome" />
        <br />
        <br />
        <input type="date" v-model="novaData" />
        <br />
        <br />
        <input type="text" placeholder="Alterar email" v-model="novoEmail" />
        <br />
        <br />
        <select v-model="departamentoUsuario" style="width:295px; height:34px;">
            <option v-for="i in departamentosCadastrados">{{ i }}</option>
        </select>
        <h3 style="color: red; font-size: 15px">
          <strong>{{ erroAlterar }}</strong>
        </h3>
        <button class="btn btn-warning" @click="alterar">Alterar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      i: 1,
      nomeUsuario: "",
      dataUsuario: "",
      emailUsuario: "",
      departamentoUsuario: "",
      erroPesquisa: "",
      novoNome: "",
      novaData: "",
      novoEmail: "",
      erroInputVazioAdicionar: "",
      mostrarAlterar: true,
      esconderTabelaPrincipal: true,
      pesquisaAchou: false,
      pesquisa: "",
      pesquisaId: 0,
      pesquisaNome: "",
      pesquisaData: "",
      pesquisaEmail: "",
      pesquisaDepartamento: "",
      idAtualAlterar: '',
      nomeAtualAlterar: '',
      dataAtualAlterar: '',
      emailAtualAlterar: '',
      departamentoAtualAlterar: '',
      erroAlterar: ''
    };
  },
  methods: {
    adicionar() {
      if (
        this.nomeUsuario.length == 0 ||
        this.dataUsuario.length == 0 ||
        this.emailUsuario.length == 0 ||
        this.departamentoUsuario.length == 0
      ) {
        this.erroInputVazioAdicionar = "Preencha todos os campos";
      } else {
        this.erroInputVazioAdicionar = "";
        this.$store.state.usuarios.id.push(this.i++);
        this.$store.state.usuarios.nome.push(this.nomeUsuario);
        this.$store.state.usuarios.data.push(this.dataUsuario);
        this.$store.state.usuarios.email.push(this.emailUsuario);
        this.$store.state.usuarios.departamento.push(this.departamentoUsuario);
        this.nomeUsuario = "";
        this.dataUsuario = "";
        this.emailUsuario = "";
        this.departamentoUsuario = "";
      }
    },
    excluir(index) {
      if (confirm("Tem certeza que deseja excluir este departamento?")) {
        this.$store.state.usuarios.id.splice(index, 1);
        this.$store.state.usuarios.nome.splice(index, 1);
        this.$store.state.usuarios.data.splice(index, 1);
        this.$store.state.usuarios.email.splice(index, 1);
        this.$store.state.usuarios.departamento.splice(index, 1);
        this.esconderTabelaPrincipal = true;
      }
    },
    pesquisar() {
      if (this.pesquisa.length == 0) {
        alert("Digite algo no campo de pesquisa");
      } else {
        this.esconderTabelaPrincipal = !this.esconderTabelaPrincipal;
        if (this.$store.state.usuarios.id.length == 0) {
          this.erroPesquisa = "Usuario nao encontrado";
        } else {
          for (var i = 0; i < this.$store.state.usuarios.id.length; i++) {
            if (
              this.$store.state.usuarios.id[i] == this.pesquisa ||
              this.$store.state.usuarios.nome[i] == this.pesquisa ||
              this.$store.state.usuarios.data[i] == this.pesquisa ||
              this.$store.state.usuarios.email[i] == this.pesquisa ||
              this.$store.state.usuarios.departamento[i] == this.pesquisa
            ) {
              this.pesquisaAchou = !this.pesquisaAchou;
              this.erroPesquisa = "";
              this.pesquisaId = this.$store.state.usuarios.id[i];
              this.pesquisaNome = this.$store.state.usuarios.nome[i];
              this.pesquisaData = this.$store.state.usuarios.data[i];
              this.pesquisaEmail = this.$store.state.usuarios.email[i];
              this.pesquisaDepartamento = this.$store.state.usuarios.departamento[i];
              break;
            } else {
              this.pesquisaAchou = false;
              this.erroPesquisa = "Usuario nao encontrado";
              this.pesquisaId = '';
              this.pesquisaNome = '';
              this.pesquisaData = '';
              this.pesquisaEmail = '';
              this.pesquisaDepartamento = '';
            }
          }
        }
      }
    },
    alterar() {
      if (
          this.novoNome.length == 0 || 
          this.novaData.length == 0 ||
          this.novoEmail.length == 0 ||
          this.departamentoUsuario.length == 0
      ) {
        this.erroAlterar = "Preencha todos os campos!";
      } else {
        this.erroAlterar = "";
        for (var i = 0; i < this.$store.state.usuarios.id.length; i++) {
          if (
            this.$store.state.usuarios.nome[i] == 
                this.nomeAtualAlterar &&
            this.$store.state.usuarios.data[i] == 
                this.dataAtualAlterar &&
            this.$store.state.usuarios.email[i] == 
                this.emailAtualAlterar &&
            this.$store.state.usuarios.departamento[i] == 
                this.departamentoAtualAlterar
          ) {
            this.$store.state.usuarios.nome[i] = this.novoNome;
            this.$store.state.usuarios.data[i] = this.novaData;
            this.$store.state.usuarios.email[i] = this.novoEmail;
            this.$store.state.usuarios.departamento[i] = this.departamentoUsuario;
            alert("Campos alterados");
            this.novoNome = '';
            this.novaData = '';
            this.novoEmail = '';
            this.departamentoUsuario = '';
            this.mostrarAlterar = true;
          }
        }
      }
    },
    mostrarTelaAlterar(index) {
      this.mostrarAlterar = !this.mostrarAlterar;
      this.idAtualAlterar = this.$store.state.usuarios.id[index];
      this.nomeAtualAlterar = this.$store.state.usuarios.nome[index];
      this.dataAtualAlterar = this.$store.state.usuarios.data[index];
      this.emailAtualAlterar = this.$store.state.usuarios.email[index];
      this.departamentoAtualAlterar = this.$store.state.usuarios.departamento[index];
    },
    mostrarTelaAlterarNaBusca() {
      this.mostrarAlterar = !this.mostrarAlterar;
      for (var i = 0; i < this.$store.state.usuarios.id.length; i++) {
        if (
          this.$store.state.usuarios.nome[i] == this.pesquisaNome &&
          this.$store.state.usuarios.data[i] == this.pesquisaData &&
          this.$store.state.usuarios.email[i] == this.pesquisaEmail &&
          this.$store.state.usuarios.departamento[i] == this.pesquisaDepartamento
        ) {
            this.idAtualAlterar = this.$store.state.usuarios.id[i];
            this.nomeAtualAlterar = this.$store.state.usuarios.nome[i];
            this.dataAtualAlterar = this.$store.state.usuarios.data[i];
            this.emailAtualAlterar = this.$store.state.usuarios.email[i];
            this.departamentoAtualAlterar = this.$store.state.usuarios.departamento[i];
        }
      }
    },
    excluirNaPesquisa() {
      if (confirm("Tem certeza que deseja excluir este departamento?")) {
        this.$store.state.usuarios.id.splice(this.pesquisaId - 1, 1);
        this.$store.state.usuarios.nome.splice(this.pesquisaId - 1, 1);
        this.$store.state.usuarios.data.splice(this.pesquisaId - 1, 1);
        this.$store.state.usuarios.email.splice(this.pesquisaId - 1, 1);
        this.$store.state.usuarios.departamento.splice(this.pesquisaId - 1, 1);
        this.pesquisaId = this.pesquisaId - 1;
        this.esconderTabelaPrincipal = true;
      } else {
        alert("Operação cancelada");
      }
    }
  },
  computed: {
    usuarios() {
      return this.$store.state.usuarios;
    },
    departamentosCadastrados() {
      return this.$store.state.todosDepartamentos;
    }
  }
};
</script>

<style>
#tudo {
  font-size: 20px;
}
table {
  width: 70%;
  font-size: 20px;
}
input {
  width: 295px;
}
#inputBusca {
  width: 885px;
}
</style>