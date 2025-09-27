//***PRECISEI INVERTER A PORTA DO BANCO COM A DO FRONT PARA PODER RODAR NA MINHA MÁQUINA */

///<reference types="cypress" />

describe('US-012 Funcionalidade: Cadastro de membros', () => {
  it('Deve cadastrar campos obrigatorios', () => {
    // Gera e-mail único
    const timestamp = Date.now();
    const randomEmail = `teste${timestamp}@teste.com`;
    
    cy.visit('http://127.0.0.1:3000/')
    cy.get('#signup-firstname').type('João')
    cy.get('#signup-lastname').type('Silva')
    cy.get('#signup-email').type(randomEmail)
    cy.get('#signup-phone').type('11999999999')
    cy.get('#signup-password').type('Testes@12345')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso!')
  })
})

///<reference types="cypress" />

describe('CT 01 - Email Inválido', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3000/');
  });

  it('Deve exibir mensagem de erro para email inválido', () => {
    cy.get('#signup-firstname').type('João Silva');
    cy.get('#signup-lastname').type('Silva');
    cy.get('#signup-email').type('emailinvalido');
    cy.get('#signup-password').type('Senha123!');
    cy.get('#signup-button').click();
    cy.get('#signup-response').should('contain', '"message":"E-mail deve ser um email válido');
  });
});

///<reference types="cypress" />

describe('CT 02 - Senha Fraca', () => {
  it('Deve exibir erro para senha fraca', () => {
    const senhaFraca = '123';
    cy.visit('http://127.0.0.1:3000/');
    cy.get("#signup-firstname").type('João');
    cy.get("#signup-lastname").type('Silva');
    cy.get("#signup-email").type('teste@teste.com');
    cy.get("#signup-phone").type('1199999999');
    cy.get("#signup-password").type(senhaFraca);
    cy.get("#signup-button").click();
    cy.get("#signup-response").should('contain', '"message":"Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)');
  });
});

///<reference types="cypress" />

describe('CT 03 - Deve exibir erro para senha sem caracteres especiais', () => {
  it('Deve exibir erro para senha sem caracteres especiais', () => {
    const senhaSemEspecial = 'Senha123';
    cy.visit('http://127.0.0.1:3000/');
    cy.get("#signup-firstname").type('João');
    cy.get("#signup-lastname").type('Silva');
    cy.get("#signup-email").type('teste@teste.com');
    cy.get("#signup-phone").type('1199999999');
    cy.get("#signup-password").type(senhaSemEspecial);
    cy.get("#signup-button").click();
    cy.get("#signup-response").should('contain', '"message":"Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)');
  });
});

///<reference types="cypress" />

describe('CT 04 - Campos Obrigatórios Vazios', () => {
  
  it('Deve exibir erro quando primeiro nome está vazio', () => {
    cy.visit('http://127.0.0.1:3000/');
    
    // Deixa firstname vazio
    cy.get("#signup-lastname").type('Silva');
    cy.get("#signup-email").type('teste@teste.com');
    cy.get("#signup-password").type('Testes@1234');
    cy.get("#signup-button").click();
    
    cy.get("#signup-response").should('contain', '"message":"Nome não pode estar vazio');
  });

  it('Deve exibir erro quando email está vazio', () => {
    cy.visit('http://127.0.0.1:3000/');
    
    cy.get("#signup-firstname").type('João');
    cy.get("#signup-lastname").type('Silva');
    // Deixa email vazio
    cy.get("#signup-password").type('Testes@1234');
    cy.get("#signup-button").click();
    
    cy.get("#signup-response").should('contain', '"message":"E-mail não pode estar vazio');
  });

  it('Deve exibir erro quando senha está vazia', () => {
    cy.visit('http://127.0.0.1:3000/');
    
    cy.get("#signup-firstname").type('João');
    cy.get("#signup-lastname").type('Silva');
    cy.get("#signup-email").type('teste@teste.com');
    // Deixa senha vazia
    cy.get("#signup-button").click();
  
    cy.get("#signup-response").should('contain', '"message":"Senha não pode estar vazia');
  });
});

describe('CT 05 - E-mail Já Cadastrado', () => {
  it('Deve exibir erro ao tentar cadastrar e-mail já existente', () => {
    const emailExistente = 'teste.existente@email.com';
    
    cy.visit('http://127.0.0.1:3000/');
    cy.get("#signup-firstname").type('Usuário');
    cy.get("#signup-lastname").type('Existente');
    cy.get("#signup-email").type(emailExistente);
    cy.get("#signup-password").type('Senha123!');
    cy.get("#signup-button").click();
    cy.get("#signup-response").should('contain', '"message":"Este email já está cadastrado.');
       });
    });

