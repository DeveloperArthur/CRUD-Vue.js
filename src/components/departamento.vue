<template>
  <div align="center" id="tudo">
    <div v-if="mostrarAlterar">
      <form>
        <td><input v-model="nomeDepartamento" placeholder="Digite o departamento" type="text" /></td>
        <td><input type="text" placeholder="Digite a descricao" v-model="descricaoDepartamento" /></td>
        <td><button class="btn btn-primary" @click="adicionar()">Adicionar</button></td>
        <h3 style="color: red; font-size: 15px">
          <strong>{{ exibirErro }}</strong>
        </h3>
      </form>
      <hr />
      <td><input id="inputBusca" v-model="pesquisa" placeholder="Digite o que deseja buscar" type="text" /></td>
      <td><button class="btn btn-secondary" @click="pesquisar">Buscar</button></td>
      <br>
      <table border="1" v-if="esconderTabelaPrincipal">
        <tr>
          <th>ID</th>
          <th>Departamento</th>
          <th>Descrição</th>
          <th>Aplicações</th>
        </tr>
        <tr v-for="(id, index) in $store.state.departamentos.id">
          <td>{{id}}</td>
          <td>{{$store.state.departamentos.nome[index]}}</td>
          <td>{{$store.state.departamentos.descricao[index]}}</td>
          <td>
            <button class="btn btn-success" @click="mostrarTelaAlterar(index)">Alterar</button>
            <button class="btn btn-danger" @click="excluir(index)">Excluir</button>
          </td>
        </tr>
      </table>

      <table border="1" v-if="!esconderTabelaPrincipal">
        <p>Resultado da busca: </p>
        <tr>
          <th>ID</th>
          <th>Departamento</th>
          <th>Descrição</th>
          <th>Aplicações</th>
        </tr>
        <tr v-if="pesquisaAchou">
          <td>{{pesquisaId}}</td>
          <td>{{pesquisaDepartamento}}</td>
          <td>{{pesquisaDescricao}}</td>
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
          <th>Departamento</th>
          <th>Descrição</th>
        </tr>
        <tr>
          <td>{{idAtualAlterar}}</td>
          <td>{{departamentoAtualAlterar}}</td>
          <td>{{descricaoAtualAlterar}}</td>
        </tr>
      </table>
      <hr>
      <div>
          <input type="text" placeholder="Alterar Departamento" v-model="novoDepartamento" />
          <br><br>
          <input type="text" placeholder="Alterar Descrição" v-model="novaDescricao" />
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
      /*departamentos: {
        id: [],
        nome: [],
        descricao: []
      },*/
      nomeDepartamento: "",
      descricaoDepartamento: "",
      exibirErro: "",
      i: 1,
      pesquisaDepartamento: "",
      pesquisaDescricao: "",
      pesquisa: '',
      erroPesquisa: "",
      departamentoAtualAlterar: "",
      descricaoAtualAlterar: "",
      novoDepartamento: "",
      novaDescricao: "",
      esconderTabelaPrincipal: true,
      pesquisaId: 0,
      pesquisaAchou: false,
      mostrarAlterar: true,
      idAtualAlterar : ""
      /*nomeDepartamento: "",
      descricaoDepartamento: "",
      exibirErro: "",
      i: 1,
      pesquisaDepartamento: "",
      pesquisaDescricao: "",
      telaPesquisa: false,
      pesquisa: '',
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
      novaDescricao: "",
      esconderTabelaPrincipal: true,
      pesquisaId: 0,
      pesquisaAchou: false,
      mostrarAlterar: true,
      idAtualAlterar : ""*/
    };
  },
  methods: {
    adicionar() {
      if (this.nomeDepartamento.length == 0 || this.descricaoDepartamento.length == 0) {
        this.exibirErro = "Preencha todos os campos!!";
      } else {
        this.exibirErro = "";
        this.$store.state.departamentos.id.push(this.i++);
        this.$store.state.departamentos.nome.push(this.nomeDepartamento);
        this.$store.state.departamentos.descricao.push(this.descricaoDepartamento);
        this.$store.state.todosDepartamentos.push(this.nomeDepartamento);
        console.log(this.$store.state.todosDepartamentos);
        //alert("Departamento adicionado!");
        this.nomeDepartamento = "";
        this.descricaoDepartamento = "";
      }
    },
    pesquisar() {
      if(this.pesquisa.length == 0){
        alert('Digite algo no campo de pesquisa');
      }else{
        this.esconderTabelaPrincipal = !this.esconderTabelaPrincipal;
        if(this.$store.state.departamentos.id.length == 0){
          this.erroPesquisa = "Departamento nao encontrado";
        }else{
          for (var i = 0; i < this.$store.state.departamentos.id.length; i++) {
            if (this.$store.state.departamentos.id[i] == this.pesquisa || 
              this.$store.state.departamentos.nome[i] == this.pesquisa ||
              this.$store.state.departamentos.descricao[i] == this.pesquisa) {
              this.pesquisaAchou = !this.pesquisaAchou;
              this.erroPesquisa = "";
              this.pesquisaId = this.$store.state.departamentos.id[i];
              this.pesquisaDepartamento = this.$store.state.departamentos.nome[i];
              this.pesquisaDescricao = this.$store.state.departamentos.descricao[i];
              break;
            } else {
              this.pesquisaAchou = false;
              this.erroPesquisa = "Departamento nao encontrado";
              this.pesquisaDepartamento = "";
              this.pesquisaDescricao = "";
            }
          }
        }
      }
    },
    excluir(index){
      if(confirm('Tem certeza que deseja excluir este departamento?')){
        this.$store.state.departamentos.id.splice(index, 1);
        this.$store.state.departamentos.nome.splice(index, 1);
        this.$store.state.departamentos.descricao.splice(index, 1);
        this.esconderTabelaPrincipal = true;
			}else{
        alert('Operação cancelada');
			} 
    },
    alterar(){
      if(this.novoDepartamento.length == 0 || this.novaDescricao.length == 0){
        this.erroAlterar = 'Preencha todos os campos!';
      }else{
        this.erroAlterar = '';
        for(var i=0; i<this.$store.state.departamentos.id.length; i++){
          if(this.$store.state.departamentos.nome[i] == this.departamentoAtualAlterar &&
            this.$store.state.departamentos.descricao[i] == this.descricaoAtualAlterar){
            this.$store.state.departamentos.nome[i] = this.novoDepartamento;
            this.$store.state.departamentos.descricao[i] = this.novaDescricao;
            alert('Campos alterados');
            this.mostrarAlterar = true;    
          }
        }
      }
    },
    mostrarTelaAlterar(index){
      this.mostrarAlterar = !this.mostrarAlterar;
      this.idAtualAlterar = this.$store.state.departamentos.id[index];
      this.departamentoAtualAlterar = this.$store.state.departamentos.nome[index];
      this.descricaoAtualAlterar = this.$store.state.departamentos.descricao[index];
    },
    mostrarTelaAlterarNaBusca(){
      this.mostrarAlterar = !this.mostrarAlterar;
      for(var i=0; i<this.$store.state.departamentos.id.length; i++){
        if(this.$store.state.departamentos.nome[i] == this.pesquisaDepartamento && 
           this.$store.state.departamentos.descricao[i] == this.pesquisaDescricao){
             this.idAtualAlterar = this.$store.state.departamentos.id[i];
             this.departamentoAtualAlterar = this.$store.state.departamentos.nome[i];
             this.descricaoAtualAlterar = this.$store.state.departamentos.descricao[i];
        }
      }
    },
    excluirNaPesquisa(){
      if(confirm('Tem certeza que deseja excluir este departamento?')){
        this.$store.state.departamentos.id.splice(this.pesquisaId-1, 1);
        this.$store.state.departamentos.nome.splice(this.pesquisaId-1, 1);
        this.$store.state.departamentos.descricao.splice(this.pesquisaId-1, 1);
        this.pesquisaId = this.pesquisaId-1;
        this.esconderTabelaPrincipal = true;
      }else{
        alert('Operação cancelada');
			} 
    }
  },
  computed:{
    departamentos(){
      return this.$store.state.departamentos;
    }
  }
};
</script>
  
<style>
#tudo{
  font-size: 20px;
}
table{
    width: 70%;
    font-size: 20px;
}
input{
  width: 295px
}
#inputBusca{
  width: 885px
}
</style>


