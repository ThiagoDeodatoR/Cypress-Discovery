export default new class SignUpPage {
    accessPage() {
        cy.visit('https://buger-eats-qa.vercel.app')
        cy.get('a[href="/deliver"]').click()

        //CHECKPOINT
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliveryman) {
        //USER INFO
        cy.get('input[placeholder="Nome completo"]').type(deliveryman.name)
        cy.get('input[placeholder="CPF somente números"]').type(deliveryman.cpf)
        cy.get('input[placeholder="E-mail"]').type(deliveryman.email)
        cy.get('input[placeholder="Whatsapp"]').type(deliveryman.whatsapp)

        //USER ADDRESS
        cy.get('input[name="postalcode"]').type(deliveryman.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliveryman.address.addressNumber)
        cy.get('input[name="address-details"]').type(deliveryman.address.addressDetails)

        //DISABLED SHOULD USE HAVE.VALUE INSTEAD OF HAVE.TEXT 
        cy.get('input[name="address"]').should('have.value', deliveryman.address.streetName)
        cy.get('input[name="district"]').should('have.value', deliveryman.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliveryman.address.city_uf)

        //DELIVERY METHOD
        //CONTAINS IS A GET METHOD THAT MERGES THE CSS SEARCH WITH A TEXT
        cy.contains('.delivery-method li', deliveryman.deliveryMethod).click()
        cy.contains('.delivery-method li', deliveryman.deliveryMethod).should('have.class', 'selected')

        //UPLOAD CNH IMAGE
        //cy.get('input[accept^="image"]').attachFile(deliveryman.cnh) NO FOLDER IN FIXTURES 
        cy.get('input[accept^="image"]').attachFile('/images/' + deliveryman.cnh) // FOLDER IMAGES IN FIXTURES
    }

    submitForm() {
        cy.get('form button[type="submit"]').click()
    }

    confirmationModal(modalMessage) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', modalMessage)
    }

    errorAlert(errorMessage) {
        //GETS ONLY 1
        //cy.get('.alert-error').should('have.text', errorMessage)
        
        //GETS MULTIPLE
        cy.contains('.alert-error', errorMessage).should('be.visible')
    }
}

//export default new SignUpPage;