/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = Cypress._.repeat('Teste ', 30)
        cy.get('#firstName').type('Natasha')
        cy.get('#lastName').type('Bauer')
        cy.get('#email').type('natasha@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get("[class=success]").should('be.visible')
        cy.tick(3000)
        cy.get("[class=success]").should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function (){
        cy.get('#firstName').type('Natasha')
        cy.get('#lastName').type('Bauer')
        cy.get('#email').type('natasha@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get(".error").should('be.visible')
        cy.tick(3000)
        cy.get(".error").should('not.be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function (){
        cy.get('#phone').type('aaaa')
        cy.get('#phone').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do envio do formulário', function(){
        cy.get('#firstName').type('Natasha')
        cy.get('#lastName').type('Bauer')
        cy.get('#email').type('natasha@exemplo.com') 
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type('Teste')
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get(".error").should('be.visible')
        cy.tick(3000)
        cy.get(".error").should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('#firstName').type('Natasha').should('have.value', 'Natasha')
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').type('Bauer').should('have.value', 'Bauer')
        cy.get('#lastName').clear().should('have.value', '')
        cy.get('#email').type('natasha@exemplo.com').should('have.value', 'natasha@exemplo.com') 
        cy.get('#email').clear().should('have.value', '')
        cy.get('#phone-checkbox').check()
        cy.get('#phone').type('119999999').should('have.value', '119999999')
        cy.get('#phone').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get(".error").should('be.visible')
        cy.tick(3000)
        cy.get(".error").should('not.be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.clock()
        cy.get(".success").should('be.visible')
        cy.tick(3000)
        cy.get(".success").should('not.be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) pelo seu valor', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) pelo seu índice', function () {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]').check().should('have.length',3)
         .each(function($radio){ 
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
         })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
            .last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function (){
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando drag-and-drop', function (){
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function (){
        cy.fixture('example.json', {enconding:null}).as('exampleFile')
        cy.get('#file-upload').selectFile('@exampleFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
    cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
    cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789 ', 20)
        
        cy.get('#open-text-area').invoke('val', longText)
            .should('have.value', longText)
    })

    it('faz uma requisição HTTP', function() {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            expect(response.body).to.include('CAC TAT')
        })
    })

    it.only('encontra o gato escondido', function() {
        cy.get('#cat').invoke('show')
            .should('be.visible')
    })
  })
  