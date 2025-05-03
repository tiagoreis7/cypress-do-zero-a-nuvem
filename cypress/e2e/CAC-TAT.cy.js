describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("include", "Central de Atendimento ao Cliente TAT");
  });
  //LIÇÃO 02
  //Exercício extra 1
  it("preenche os campos obrigatórios e enviar o formulário", () => {
    const longText = Cypress._.repeat("abcdefghijklmnopqrstuvwxyz", 10); // criou uma varialvel com texto longo

    cy.get("#firstName").type("Tiago"); // preenche o campo de nome
    cy.get("#lastName").type("Reis"); // preenche o campo de sobrenome
    cy.get("#email").type("tiago7@my.com"); // preenche o campo de email
    //cy.get('#phone').type('71981912552') // preenche o campo de telefone
    cy.get("#open-text-area").type(longText, { delay: 0 }); // preenche o campo de mensagem com a string criada acima, com delay 0 para preencher mais rápido o campo de texto grande (text area)
    cy.get('button[type="submit"]').click(); // pega o seletor css do button, fazendo um click no botão de submit do formulário

    cy.get(".success").should("be.visible"); // verifica se a mensagem de sucesso está visível
  });

  //Exercício extra 2
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Tiago");
    cy.get("#lastName").type("Reis");
    cy.get("#email").type("tiago7@my,com");
    cy.get("#open-text-area").type("Teste");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  //Exercício extra 3
  it("campo telefone continua vazio quando preenchido com um valor não-numérico", () => {
    cy.get("#phone") // pega o campo de telefone e preenche com um valor não numérico (string)
      .type("abcdedfghij") // preenche o campo de telefone com uma string não numérica (letras)
      .should("have.value", ""); // verifica se o campo de telefone está vazio após preencher com uma string não numérica (letras)
  });

  //Exercício extra 4
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Tiago");
    cy.get("#lastName").type("Reis");
    cy.get("#email").type("tiago7@my,com");
    cy.get("#open-text-area").type("Teste");
    cy.get("#phone-checkbox").check();
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  //Exercício extra 5
  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Tiago")
      .should("have.value", "Tiago")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Reis")
      .should("have.value", "Reis")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("tiago7@my.com")
      .should("have.value", "tiago7@my.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("71981912552")
      .should("have.value", "71981912552")
      .clear()
      .should("have.value", "");
  });

  //Exercício extra 6
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
  //Exercício extra 7

  it("envia o formuário com sucesso usando um comando customizado", () => {
    /* chama o comando customizado "fillMandatoryFieldsAndSubmit()" criado no arquivo commands.js para preencher os campos obrigatórios e submeter o formulário com sucesso (sem erros)*/
    //primeira opção
    //cy.fillMandatoryFieldsAndSubmit();
    //segunda opção
    const data = {
      firstName: "Tiago",
      lastName: "Reis",
      email: "tiago7@my.com",
      text: "Teste.",
    };
    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").should("be.visible");
  });

  //Exercício extra 8
  //usando 'cy.contains()' no lugar de 'cy.get()'
  it("usando 'cy.contains()' no lugar de 'cy.get()'", () => {
    cy.get("#firstName").type("Tiago");
    cy.get("#lastName").type("Reis");
    cy.get("#email").type("tiago7@my,com");
    cy.get("#open-text-area").type(
      "Obrigado pelo ensinamento deste curso de Test."
    );
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  // LIÇÃO 03
  // Exercício
  it("Seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  //Exercício extra 1
  it("Seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });
  //Exercício extra 2
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  //LIÇÂO 04
  //Exercício
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]').check("feedback").should("be.checked"); //checa se foir marcado o 'feedback'
  });
  //Exercício extra
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });
  //LIÇÃO 05
  //Exercício
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]').check().should("be.checked"); // marca todos os checkboxes
    cy.get('input[type="checkbox"]').last().uncheck().should("not.be.checked"); // desmarca o último checkbox
  });
  //LIÇÃO 06
  //Exercício
  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json") // seleciona o arquivo example.json da pasta fixtures
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json"); // verifica se o arquivo foi selecionado corretamente
      });
  });
  //Exercício extra 1
  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" }) // seleciona o arquivo example.json da pasta fixtures simulando um drag-and-drop
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json"); // verifica se o arquivo foi selecionado corretamente
      });
  });
  //Exercício extra 2
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile"); // cria um alias para o arquivo example.json da pasta fixtures
    cy.get("#file-upload")
      .selectFile("@sampleFile") // seleciona o arquivo utilizando o alias
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json"); // verifica se o arquivo foi selecionado corretamente
      });
  });

  //LIÇÃO 07
  //Exercício
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade") // pega o link da política de privacidade
      .should("have.attr", "href", "privacy.html") // verifica se o link da política de privacidade está correto
      .and("have.attr", "target", "_blank"); // verifica se o link da política de privacidade abre em outra aba
  });
  //Exercício extra 1
  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade") // pega o link da política de privacidade
      .invoke("removeAttr", "target") // remove o atributo target do link
      .click(); // clica no link

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible"); // verifica se a página da política de privacidade está visível
  });
  //Exercício extra 2
  //foi criado separado, com o nome "privacyPolicy.cy.js"

  //LIÇÂO 08
  //Exercício
  //Crie um script no arquivo package.json que abre o Cypress Runner simulando um dispositivo com 410 pixels de largura e 860 pixels de altura, criei no package.json um script com o nome "cy:open:mobile": "cypress open --config viewportWidth=410 viewportHeight=860" onde eu consigo chamar no terminal $npm run cy:open:mobile
  //Exercício extra
  //Crie um script no arquivo package.json que rode os testes em modo headless, simulando um dispositivo com 410 pixels de largura e 860 pixels de altura, criei no package.json um script com o nome "test:mobile": "cypress run --config viewportWidth=410 viewportHeight=860" onde eu consigo chamar no terminal $npm run test:mobile

  //LIÇÂO 09
});
