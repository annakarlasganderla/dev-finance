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

// funcionabilidade para pegar os valores do usuário
const get = [
  {
  id: 1,
  description: 'luz',
  amount: -50000,
  date: '17/05/2021' 
  }, 
  {
  id: 2,
  description: 'website',
  amount: 500000,
  date: '17/05/2021' 
  }, 
  {
    id: 3,
    description: 'internet',
    amount: -20000,
    date: '17/05/2021' 
  },
  {
    id: 4,
    description: 'site2',
    amount: 30000,
    date: '17/05/2021' 
  }
]
  
// funcionalidades de entreda de dados /// entrada e saída de dinheiro
const transaction = {
  incomes () {
    // somar as entradas
    let income = 0

    // pegar todas as transaçoes
    get.forEach(transaction => {
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
      get.forEach(transaction => {
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

    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction) {
                    // se transaction.amount > 0  fica income senao, troca por expanse
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    // formatação da moeda
    const amount = utils.formatCurrency(transaction.amount)
  
    const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
              <img src="./assets/minus.svg" alt="remover">
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
  }
}

// continuação da formatação do valor
const utils = {
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

get.forEach(function(transaction) {
  DOM.addTransaction(transaction)
})  // mesma coisa que um for

DOM.updateBalance()