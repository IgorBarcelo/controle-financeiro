<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="titulos" class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Títulos</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ props }">
                    <v-btn color="primary" dark class="mb-2" v-bind="props" >Novo Título</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ editingTitulo ? 'Editar Título' : 'Novo Título' }}</span>
                    </v-card-title>
                    <v-card-text>
                      <!-- Formulário para adicionar novo título -->
                      <v-text-field v-model="novoTitulo.descricao" label="Descrição"></v-text-field>
                      <v-text-field v-model="novoTitulo.valor" label="Valor" type="number"></v-text-field>
                      <v-text-field v-model="novoTitulo.data" label="Data" type="date"></v-text-field>
                      <v-switch v-model="novoTitulo.pago" label="Pago"></v-switch>
                      <v-text-field v-model="novoTitulo.meioDePagamento" label="Meio de Pagamento"></v-text-field>
                      <v-select v-model="novoTitulo.tipo" :items="['A Pagar', 'A Receber']" label="Tipo"></v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        dialog: false,
        novoTitulo: {
          descricao: '',
          valor: 0,
          data: '',
          pago: false,
          meioDePagamento: '',
          tipo: 'A Pagar'
        },
        editingTitulo: null, // Novo estado para armazenar o título em edição
        headers: [
          { title: 'ID', value: 'id', sortable: true },
          { title: 'Título', value: 'descricao', sortable: true },
          { title: 'Valor', value: 'valor', sortable: true },
          { title: 'Data', value: 'data', sortable: true },
          { title: 'Status', value: 'pago', sortable: true },
          { title: 'Meio de Pagamento', value: 'meioDePagamento', sortable: true },
          { title: 'Tipo', value: 'tipo', sortable: true },
          { title: 'Ações', value: 'actions', sortable: false }
        ],
        titulos: []
      }
    },
    methods: {
      async save() {
        try {
          // Configuração do novo título
          const tituloData = {
              descricao: this.novoTitulo.descricao,
              valor: parseFloat(this.novoTitulo.valor),
              data: new Date(this.novoTitulo.data).toISOString(),
              pago: this.novoTitulo.pago,
              meioDePagamento: this.novoTitulo.meioDePagamento,
              tipo: this.novoTitulo.tipo === 'A Pagar' ? 0 : 1 // Convertendo para o tipo esperado pela API
          };

          let response;
          if (this.editingTitulo) {
            // Atualizando um título existente
            response = await axios.put(`https://localhost:7088/Titulos/${this.editingTitulo.id}`, tituloData)
            console.log('Resposta do PUT:', response);
            const index = this.titulos.findIndex(titulo => titulo.id === this.editingTitulo.id)
            if(index !== -1){
              this.titulos[index] = { ...this.editingTitulo, ...tituloData, tipo: tituloData.tipo === 0 ? 'A Pagar' : 'A Receber' };
            }
          } else {
            // Criando um novo título
            response = await axios.post('https://localhost:7088/Titulos', tituloData);
            console.log('Resposta do POST:', response);
            this.titulos.push(response.data);
          } 

          console.log('Título salvo com sucesso:', response.data);
          this.dialog = false
          this.resetForm()
        } catch (error) {
          console.error('Erro ao salvar título:', error)
        }
      },
      editItem(item) {
        this.editingTitulo = item
        this.novoTitulo = {
          // tituloAtualizado: item.descricao,
          descricao: item.descricao,
          valor: item.valor,
          data: item.data.split('T')[0],
          pago: item.pago,
          meioDePagamento: item.meioDePagamento,
          tipo: item.tipo === 0 ? 'A Pagar' : 'A Receber' // Convertendo o tipo para o rótulo correspondente
         }
        this.dialog = true
      },
      async deleteItem(item) {
        try {
          await axios.delete(`https://localhost:7088/Titulos/${item.id}`)
          const index = this.titulos.indexOf(item)
          if (index > -1) {
            this.titulos.splice(index, 1)
          }
        } catch (error) {
          console.error('Erro ao deletar título:', error)
        }
      },
      resetForm() {
      this.novoTitulo = {
        descricao: '',
        valor: 0,
        data: '',
        pago: false,
        meioDePagamento: '',
        tipo: 'A Pagar'
      };
      this.editingTitulo = null;
    },
    mapTipo(titulos) {
      return titulos.map(titulo => ({
        ...titulo,
        tipo: titulo.tipo === 0 ? 'A Pagar' : 'A  Receber',
        pago: titulo.pago ? 'Pago' : 'Pendente',
        data: this.formatDate(titulo.data) // Formatando a data
      }));
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    }
  },
    async mounted() {
      try {
        const response = await axios.get('https://localhost:7088/Titulos')
        this.titulos = this.mapTipo(response.data);
      } catch (error) {
        console.error('Erro ao carregar títulos:', error)
      }
    }
  }
  </script>
  