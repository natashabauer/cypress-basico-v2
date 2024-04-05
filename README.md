# Testes automatizados com Cypress - Básico

Projeto criado para o curso básico de Cypress da Talking about Testing do Walmir Filho.

## Pré-requisitos

É necessário possuir o Node.js e npm instalados para rodar este projeto.

Eu usei as versões `v18.15.0` e `9.5.0` do Node.js ae npm, respectivamente. Sugiro usar as mesmas versões ou anteriores.

## Instalação

Rode `npm install` para instalar as dependências.

## Testes

É possível rodar os testes simulando um viewport desktop ou mobile.

- Desktop
Rodar `npm test` para rodar o teste no modo headless.

Ou, rodar `npm run cy:open` para abrir o Cypress no modo interativo.

- Mobile
Rodar `npm test:mobile` para rodar o teste no modo headless.

Ou, rodar `npm run cy:open:mobile` para abrir o Cypress no modo interativo.


Esse projeto foi criado com 💚 por [Walmyr](https://walmyr.dev).