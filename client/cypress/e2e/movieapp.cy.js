describe('movie app', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Cuevana')
  })
})
describe('movie app', () => {
    it('front page can be opened', () => {
      cy.visit('http://localhost:3000/MainPage')
    })
  })