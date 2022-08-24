import signUpPage from '../../pages/SignUpPage'
import signUpPageFactory from '../../factories/SingUpPageFactory'
import requiredFieldsFactory from '../../factories/RequiredFieldsFactory'

describe('createDeliveryman', () => {
    beforeEach(function () {
        cy.fixture('deliveryman').then((data) => {
            this.deliveryman = data
        });
    })

    //USING FIXTURE
    it('User should create deliveryman account', function () {
        signUpPage.accessPage()
        signUpPage.fillForm(this.deliveryman.signUp)
        signUpPage.submitForm()

        //CONFIRMATION MODAL
        const modalMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signUpPage.confirmationModal(modalMessage)
    })

    //USING FIXTURE
    it('Invalid CPF', function () {
        signUpPage.accessPage()
        signUpPage.fillForm(this.deliveryman.invalidCpf)
        signUpPage.submitForm()
        signUpPage.errorAlert('Oops! CPF inválido')
    })

    //USING FACTORY
    it('Invalid Email', function () {
        var deliveryman = signUpPageFactory()

        deliveryman.email = 'test.com.br'

        signUpPage.accessPage()
        signUpPage.fillForm(deliveryman)
        signUpPage.submitForm()
        signUpPage.errorAlert('Oops! Email com formato inválido.')
    })

    //MORE THAN 1 OF SAME SELECTOR
    //STOPS IF FINDS AN ERROR
    it('Required fields with it', function () {
        signUpPage.accessPage()
        signUpPage.submitForm()
        signUpPage.errorAlert('É necessário informar o nome')
        signUpPage.errorAlert('É necessário informar o CPF')
        signUpPage.errorAlert('É necessário informar o email')
        signUpPage.errorAlert('É necessário informar o CEP')
        signUpPage.errorAlert('É necessário informar o número do endereço')
        signUpPage.errorAlert('Selecione o método de entrega')
        signUpPage.errorAlert('Adicione uma foto da sua CNH')
    })

    //USING FACTORY
    //MORE THAN 1 OF SAME SELECTOR
    //WONT STOP IF FINDS AN ERROR
    context('Required fields with context', function () {
       var requiredFields = requiredFieldsFactory()

        before(function () {
            signUpPage.accessPage()
            signUpPage.submitForm()
        })

        requiredFields.forEach(function (msg) {
            it(`${msg.field} is required`, function () { //IT('X IS REQUIRED', function () {})
                signUpPage.errorAlert(msg.output)
            })
        })
    })
})