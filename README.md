# Contact Screen PortLuis

Aplicação na qual foi solicitado uma interface que liste os contatos através de um endpoint.

A aplicação foi feita com Vue e a API utilizada foi montada utilizando um JSON Server local.
A API é apenas para teste mas nada impede de usar uma API real.

A interface foi construída usando um modelo de tabelas com as informações solicitadas utilizando o Vue Material com um tema escuro.

Algumas pequenas formatações personalizadas foram feitas utilizando _SASS_.

### Instalação

As etapas a seguir assumem que o _NPM_ está instalado na máquina.

Caso contrário, consulte o link [`https://www.npmjs.com/get-npm`](https://www.npmjs.com/get-npm).

Caso use o _Yarn_, sinta-se à vontade para usar os comandos equivalentes.

1. Clone o repositório de [`https://github.com/elderfonseca/contact-screen.git`](https://github.com/elderfonseca/contact-screen.git).
2. Execute o `npm install` no diretório raiz.
3. Instale o _JSON Server_
```
npm install -g json-server
```
4. No diretório raiz do projeto execute o _JSON Server_
```
json-server --watch db.json
```
5. Após a instalação e quando o _JSON Server_ estiver rodando, em outro terminal, execute a aplicação.
```
npm run serve
```

A aplicação rodara no endereço [`http://localhost:8080/`](http://localhost:8080/) já com alguns registros que estão no arquivo _db.json_ que se encontra na raiz do projeto.
