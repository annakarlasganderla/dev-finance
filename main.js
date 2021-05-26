const modal = {  
    open() {     // objeto
      // abrir modal
      // adicionar classe active ao modal
      document.querySelector('.modal-overlay')   // pesquisa pelo seletor
      .classList.add('active')  // adiciona active
    },
    close() {
      // fechar o MODAL
      // remover a classe active do modal
      document.querySelector('.modal-overlay')   // pesquisa pelo seletor
      .classList.remove('active')  // remove o active
    }
}

const storage = {
  // pegar informações
  get() {
    return JSON.parse(localStorage.getItem('dev.finances: transactions')) || []
  },

  // guardar informações
  set(transaction) {
    localStorage.setItem(
      "dev.finances: transactions", 
      JSON.stringify(transaction)
      )
  }
}

// funcionabilidade para pegar os valores do usuário
const transaction = {
  all: storage.get(),

  // funcionalidades de entreda de dados /// entrada e saída de dinheiro
  add(transaction) {
    transaction.all.push(transaction)

    app.reload()
  },
  remove(index) {
    transaction.all.splice(index, 1)

    app.reload()

  },
  incomes () {
    // somar as entradas
    let income = 0

    // pegar todas as transaçoes
    transaction.all.forEach(transaction => {
    //  verificar se é maior que 0
      if (transaction.amount > 0) {
      // somar a uma varialvel e retornar a variavel
      income += transaction.amount
    }
    })
    return income
  },
  expenses() {
      // somar as entradas
      let expense = 0
  
      // pegar todas as transaçoes
      transaction.all.forEach(transaction => {
      //  verificar se é maior que 0
        if (transaction.amount < 0) {
        // somar a uma varialvel e retornar a variavel
        expense += transaction.amount
      }
      })
      return expense
  },
  total() {
    // entradas - saídas
    return transaction.incomes() + transaction.expenses();
  }
}

// pegar os dados do get e substituir no html
const DOM = {
  // busca o tbody no html
  transactionsContainer: document.querySelector('#data-table tbody'),

  // adiciona transação
  addTransaction(transaction, index) {

    const tr = document.createElement('tr')           // index é a posiçao do array
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction,index) {
                    // se transaction.amount > 0  fica income senao, troca por expanse
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    // formatação da moeda
    const amount = utils.formatCurrency(transaction.amount)
  
    const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
              <img onClick="transaction.remove(${index})" src="./assets/minus.svg" alt="remover">
            </td>
    `
    return html
  },
  updateBalance() {  // atualizar as entradas e saídas
    document.getElementById('incomeDisplay')
    .innerHTML = utils.formatCurrency(transaction.incomes())

    document.getElementById('expenseDisplay')
    .innerHTML = utils.formatCurrency(transaction.expenses())

    document.getElementById('totalDisplay')
    .innerHTML = utils.formatCurrency(transaction.total())
  },

  clearTransaction() {
    DOM.transactionsContainer.innerHTML = ""
  }
}

// continuação da formatação do valor
const utils = {
  formatAmount(value){
    value = Number(value) * 100

    return value
  },

  formatDate(date) {
    const splittedDate = date.split("-")
    
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""  // formatação do sinal

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }
}

// capturar dados do formulário
const form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: form.description.value,
      amount: form.amount.value,
      date: form.date.value
    }
  },
  validateField() {
    // pegar dados e colocar em uma varialvel
    const { description, amount, date } = form.getValues()
    
    if ( description.trim() === "" ||
         amount.trim() === "" || 
         date.trim() === "") {
           throw new Error("Por favor, preencha todos os campos")
         }
  },
  formatValues() {
    let { description, amount, date } = form.getValues()

    amount = utils.formatAmount(amount)

    date = utils.formatDate(date)
    
    return {
      description,
      amount,
      date
    }
  },
  clearFields() {
    form.description.value = ""
    form.amount.value = ""
    form.date.value = ""
  },
  saveTransaction(transaction) {
    transaction.add(transaction)
  },
  
  submit(event) {
    // nao deixar os dados na caixa de URL
    event.preventDefault()

    try {
      // verificar se todas as informações estao preenchidas
      form.validateField()

      // formatar dados para salvar
      const transaction = form.formatValues()

      // salvar
      form.saveTransaction(transaction)

      // apagar os dados do formulario
      form.clearFields()

      // fechar MODAL
      modal.close()

    } catch (error) {
      alert(error.message)
    }
    
  }
}

const app = {
  init() {
    transaction.all.forEach(DOM.addTransaction) // mesma coisa que um for
    
    DOM.updateBalance()

    storage.set(transaction.all)
  },

  reload() {
    DOM.clearTransaction()
    app.init()
  },
}

app.init()



