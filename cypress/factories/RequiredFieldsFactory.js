export default function requiredFields () {
   
    const messages = [
        { field: 'name', output: 'É necessário informar o nome' },
        { field: 'cpf', output: 'É necessário informar o CPF' },
        { field: 'email', output: 'É necessário informar o e-mail' }, //FORCED ERROR FOR TESTING: E-MAIL INSTEAD OF EMAIL
        { field: 'postalcode', output: 'É necessário informar o CEP' },
        { field: 'addressNumber', output: 'É necessário informar o número do endereço' },
        { field: 'deliveryMethod', output: 'Selecione o método de entrega' },
        { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
    ]

    return messages
}