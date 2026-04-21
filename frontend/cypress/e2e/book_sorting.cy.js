describe('Book List Sorting', () => {
  const username = `sortuser${Math.floor(Math.random() * 1000)}`;
  const password = `sortpass${Math.floor(Math.random() * 1000)}`;
  const user = { username, password };

  before(() => {
    cy.visit('http://localhost:5173');
    cy.contains('Create Account').click();
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button#register').click();
    cy.wait(1000);
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button#login').click();
    cy.contains(`Hi, ${user.username}`).should('exist');
  });

  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button#login').click();
    cy.contains('Books').click();
    cy.contains('h2', 'Books').should('exist');
  });

  it('should display sort buttons for Title and Author', () => {
    cy.contains('button', 'Title').should('exist');
    cy.contains('button', 'Author').should('exist');
  });

  it('should sort books by title ascending when Title button is clicked', () => {
    cy.contains('button', /Title/).click();
    cy.get('.bookTitle, [class*="bookTitle"]').then($titles => {
      const titles = [...$titles].map(el => el.textContent.trim().toLowerCase());
      const sorted = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).to.deep.equal(sorted);
    });
  });

  it('should toggle sort order when clicking the same sort button twice', () => {
    cy.contains('button', /Title/).click();
    cy.contains('button', /Title ▲/).should('exist');
    cy.contains('button', /Title/).click();
    cy.contains('button', /Title ▼/).should('exist');
  });

  it('should sort books by author when Author button is clicked', () => {
    cy.contains('button', /Author/).click();
    cy.contains('button', /Author ▲/).should('exist');
  });
});
