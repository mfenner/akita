describe('workContainer with usage', () => {
  before(() => {
    cy.setCookie('_consent', 'true')
    cy.visit(`/doi.org/${encodeURIComponent('10.7272/q6g15xs4')}`)
  })

  it('creators', () => {
    cy.get('.creator .creator-list', { timeout: 30000 })
      .should('have.length', 2)
      .should('contain', 'William Mower')
  })

  it('share', () => {
    cy.get('.share .share-list', { timeout: 30000 })
      .should('have.length', 1)
      .should('contain', 'Email')
  })

  it('download', () => {
    cy.get('.download .download-list', { timeout: 30000 })
      .should('have.length', 2)
      .should('contain', 'DataCite XML')
  })

  it('cite as', () => {
    cy.get('.cite-as')
      .select('ieee')
      .get('.formatted-citation', { timeout: 30000 })
      .should('contain', 'NEXUS Head CT')
  })

  it('chart', () => {
    cy.get('.mark-rect > path', { timeout: 30000 }).should('be.visible')
  })
})

// describe('workContainer with funding', () => {
//   before(() => {
//     cy.setCookie('_consent', 'true')
//     cy.visit(`/doi.org/${encodeURIComponent('10.1594/ieda/100004')}`)
//   })

//   it('creators', () => {
//     cy.get('.creator .creator-list', { timeout: 30000 }).should(
//       'contain',
//       'Allison Shaw'
//     )
//   })

// it('contributors', () => {
//   cy.get('.contributor .contributor-list', { timeout: 30000 }).should(
//     'contain',
//     'The British Library'
//   )
// })

// it('funding', () => {
//   cy.get('#work-funding', { timeout: 30000 }).contains('Funding')
//   cy.get('.panel.funding .funder-list').should(
//     'contain',
//     'National Science Foundation'
//   )
// })
// })

export {}
