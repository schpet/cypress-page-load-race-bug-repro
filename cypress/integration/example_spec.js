describe(`race condition`, () => {
  it(`works if you wait`, () => {
    cy.visit('/')

    cy.get('body').should('contain', '42')

    cy
      .get('#app')
      .each($el => {
        const value = parseFloat($el.text())
        expect(value).to.be.gte(40)
      })
  })

  it(`fails if you do not wait`, () => {
    cy.visit('/')

    cy
      .get('#app')
      .each($el => {
        const value = parseFloat($el.text())
        expect(value).to.be.gte(40)
      })
  })

  it(`doesn't like to wait for network requests`, () => {
    cy.server()
    cy.route('GET', '/sample-response.json').as('foo')

    cy.visit('/').wait('@foo')

    cy
      .get('#app')
      .each($el => {
        const value = parseFloat($el.text())
        expect(value).to.be.gte(40)
      })
  })
})
