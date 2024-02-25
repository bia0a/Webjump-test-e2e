
# Teste E2E Webjump 

Este é um projeto que foi desenvolvido como parte do desafio técnico proposto pela Avaliação Webjump.

## Clone

Para clonar o repositório em sua máquina local, execute o seguinte comando:

```
  $ git clone https://github.com/bia0a/test-e2e-Webjump.git

```
### Instalação do Cypress

#### Pré-requisitos

Certifique-se de ter o Node.js instalado em seu sistema. Caso não tenha, faça o download e a instalação a partir do [site oficial do Node.js] https://nodejs.org/. O teste foi realizado na versão v14.20.0.

#### Passos de Instalação e Execussão

1. Abra o terminal na pasta do seu projeto.

2. Execute o seguinte comando para iniciar um novo projeto Node.js:

    ```bash
    npm init -y
    ```

3. Instale o Cypress como dependência de desenvolvimento:

    ```bash
    npm install --save-dev cypress
    ```

4. Execute o Cypress usando o comando:

    ```bash
    npm run cypress
    ```
## Executando o arquivo cy.js

Ao iniciar a UI do cypress, uma tela de boas vindas aparecerá, com duas opções:
```
E2ETesting    |   Component Testing
 ```
É importante observar que o a opção de E2ETesting já deve estar como configurada, após isso a mesma deverá ser selecionada.

Assim, você será direcionado a uma página para a escolha de um dos três navegadores WEBChrome, Edge, Electron disponíves. Quando selecionado, o navegador irá abrir e listar os E2E specs:

```
Webjump.cy.js
```

Com um clique duplo o navegador deverá executar o teste.
 
  
   
    
     
## Cenários Opcionais
Os demais testes estão localizados no diretório:
```
cypress
|-- integration
|   |-- forgot-password.spec.js
|   |-- add-to-cart-product-page.spec.js
|   |-- add-to-cart-search.spec.js
|   |-- order-list.spec.js
|   |-- order-detail.spec.js
```

### Esqueci Minha Senha
Para executar o teste de Esqueci Minha Senha;

Na página de login, clique em "Esqueci minha senha".
Siga as instruções fornecidas para redefinir sua senha.
Quando solicitado, complete o captcha para verificar sua identidade.
Exemplo de teste Cypress:

```javascript
describe('Esqueci Minha Senha', () => {
  it('Deve permitir a recuperação de senha', () => {
    cy.visit('/login');
    cy.contains('Esqueci minha senha').click();
    cy.get('#email').type('seu-email@example.com');
    cy.contains('Redefinir Senha').click();
    cy.get('#captcha').type('valor-do-captcha');
     // Substitua com o valor correto
    cy.contains('Enviar').click();
    // Adicione lógicas adicionais conforme necessário
  });
});
```

### Adicionar Produto ao Carrinho
#### Página de Produto
Navegue até a página do produto desejado selecione o tamanho e cor do produto.
Clique no botão "Adicionar ao Carrinho".
O produto será adicionado ao carrinho.
Exemplo de teste Cypress:
```javascript
describe('Adicionar Produto ao Carrinho - Página de Produto', () => {
  it('Deve adicionar o produto ao carrinho', () => {
    cy.visit('/product/123');
    cy.get('#size').select('M');
    cy.get('#color').select('Azul');
    cy.contains('Adicionar ao Carrinho').click();
   // Adicione lógicas adicionais conforme necessário
  });
});
```
#### Busca
Utilize a função de busca para encontrar o produto desejado.
Na página de resultados da busca, clique no produto.
Adicione o produto ao carrinho utilizando o botão correspondente.
Exemplo de teste Cypress:
```javascript
describe('Adicionar Produto ao Carrinho - Busca', () => {
  it('Deve adicionar o produto ao carrinho a partir da busca', () => {
    // Utilize a função de busca para encontrar o produto desejado
    cy.visit('/');
    cy.get('#search-input').type('Nome do Produto');
    cy.contains('Pesquisar').click();

    // Na página de resultados da busca, clique no produto e escolha as partes de cor e tamanho
    cy.contains('Nome do Produto').click();
    cy.get('#size').select('M');
    cy.get('#color').select('Azul');
    // Adicione o produto ao carrinho utilizando o botão correspondente
    cy.contains('Adicionar ao Carrinho').click();

    //  Adicione lógicas adicionais conforme necessário
  });
});

```

### Validação do Pedido Realizado
#### Lista de Pedidos
Exemplo de teste Cypress:

```javascript
describe('Validação do Pedido Realizado - Lista de Pedidos', () => {
  it('Deve exibir o pedido na lista de pedidos', () => {
    cy.visit('/account/orders');
    //  Adicione lógicas adicionais conforme necessário
  });
});
```
Acesse a lista de pedidos na área da conta do usuário.
Verifique se o pedido desejado está listado.
#### Detalhe do Pedido
Abra os detalhes do pedido desejado.
Confira se todas as informações do pedido estão correta
Exemplo de teste Cypress:
```javascript
describe('Validação do Pedido Realizado - Detalhe do Pedido', () => {
  it('Deve exibir corretamente os detalhes do pedido', () => {
    // Suponha que o pedido desejado tenha o ID 123
    const orderId = 123;

    // Acesse a lista de pedidos na área da conta do usuário
    cy.visit('/account/orders');

    // Clique no pedido desejado para abrir os detalhes
    cy.contains(`Detalhes do Pedido #${orderId}`).click();

    // Confira se todas as informações do pedido estão corretas
    cy.get('#order-id').should('contain', `Pedido #${orderId}`);
    cy.get('.product-name').should('have.length.greaterThan(0)');
    // Adicione mais lógicas conforme necessário para verificar outros detalhes do pedido
  });
});


```

Consulte a documentação oficial do Cypress para obter detalhes sobre a escrita de testes: [https://docs.cypress.io/](https://docs.cypress.io/).


## Boas Práticas

- **Mantenha os testes independentes:** Cada teste deve ser independente, evitando dependências de estado entre eles.
  
- **Utilize `cy.wait` com sabedoria:** Evite o uso excessivo de `cy.wait`. Use-o apenas quando necessário para garantir a sincronização correta do teste.

- **Documente os testes:** Adicione comentários explicativos nos testes para facilitar a compreensão futura.

- **Execute testes regularmente:** Integre os testes ao seu fluxo de integração contínua para garantir que sejam executados regularmente.
