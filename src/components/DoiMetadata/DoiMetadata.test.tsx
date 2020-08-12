/// <reference types="cypress" />

import React from 'react'
import { mount } from 'cypress-react-unit-test'
import DoiMetadata from './DoiMetadata'

describe('DoiMetadata Component', () => {
  let data

  beforeEach(function () {
    cy.fixture('doi.json').then((d) => {
      data = d
    })
  })

  it('title', () => {
    mount(<DoiMetadata metadata={data} />)
    cy.get('h3.work').contains('Example title of the item').should('be.visible')
  })

  it('creators', () => {
    mount(<DoiMetadata metadata={data} />)
    cy.get('.creators').contains('John Smith').should('be.visible')
  })

  it('no creators', () => {
    data.creators = []
    mount(<DoiMetadata metadata={data} />)
    cy.get('.creators').contains('No creators').should('be.visible')
  })

  it('metadata', () => {
    mount(<DoiMetadata metadata={data} />)
    cy.get('.metadata')
      .contains('Version 1.0 of CSV File published 2019 via SURFsara')
      .should('be.visible')
  })

  it('description', () => {
    mount(<DoiMetadata metadata={data} />)
    cy.get('.description')
      .contains('Example description of the item.')
      .should('be.visible')
  })

  it('tags', () => {
    mount(<DoiMetadata metadata={data} />)
    cy.get('.tags').contains('Dataset').should('be.visible')
  })

  it('metrics counter', () => {
    mount(<DoiMetadata metadata={data} />)
    cy.get('.metrics-counter')
      .contains('4 Citations 8 Views 3K Downloads')
      .should('be.visible')
  })

  it('metrics counter K', () => {
    data.citationCount = 4623
    data.viewCount = 8976
    data.downloadCount = 3143
    mount(<DoiMetadata metadata={data} />)
    cy.get('.metrics-counter')
      .contains('4.6K Citations 9K Views 3.1K Downloads')
      .should('be.visible')
  })

  it('metrics counter M', () => {
    data.citationCount = 4623000
    data.viewCount = 8976000
    data.downloadCount = 3143000
    mount(<DoiMetadata metadata={data} />)
    cy.get('.metrics-counter')
      .contains('4.6M Citations 9M Views 3.1M Downloads')
      .should('be.visible')
  })

  it('actions', () => {
    mount(<DoiMetadata metadata={data} />)
    cy.get('.actions').contains('Bookmark Claim').should('be.visible')
  })
})
