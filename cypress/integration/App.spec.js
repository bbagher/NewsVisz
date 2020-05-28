
describe("Newsvisz", () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('renders all news', () => {
    cy.get('.article-card')
      .should('have.length', 40)

  })

  it('filters by search', () => {
    cy.get('.search')
      .type('china')
      .type('{enter}')
      .get('.article-card')
      .should('have.length', 40)

  })

  it('filters by watchlist', () => {
    cy.get('[type="checkbox"]').check('MSFT')      
      .get('#ticker')
      .should('have.text', 'Ticker : MSFT')

  })

  // it('display visualization', () => {

  // })

  // it('updates visualization', () => {
    
  // })

})