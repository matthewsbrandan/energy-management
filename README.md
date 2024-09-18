# ENERGY MANAGEMENT

Aplicação monolitíca de gestão de energia para SmartHomes.

Essa aplicação possui, além da interface de usuário, uma API Rest e WebSocket para se comunicar com os dispositivos IoT.

## GET STARTED

- **Instalando dependências**

  Rode o comando a seguir para instalar todas as dependências da aplicação:

  ```
    npm install
  ```

- **Configurando variáveis ambiente**

  Após ter instalado as dependências, crie um arquivo ```.env``` na raiz do código com todas as informações descritas no ```.env.example```.

- **Configurando banco de dados**

  Para criar o banco de dados basta rodar os comandos do prisma descritos à seguir:

  ```
    npx prisma migrate
    npx prisma generate
  ```

  Caso você tenha usado a configuração recomendada no ```.env.example```, esses comandos criarão o arquivo ```prisma/dev.db```

- **Acessando banco de dados**

  Caso você queira acessar o banco criado, o prisma é capaz de criar uma interface para você interagir com o banco, executando o seguinte comando:

  ```
    npx prisma studio
  ```

- **Startar a aplicação**

  Com todos os passos anteriores completos você precisa apenas executar o comando abaixo para levantar a aplicação:

  ```
    npm run dev
  ```

- **Adição de classes tailwind**

  Toda vez que adicionar uma nova classe tailwind que não tenha sido utilizada ainda na aplicação deve rodar o comando de build abaixo para que o tailwind possa adicionar a classe ao css utilizado:
  
  ```
    npm run build:css
  ```

## TESTANDO A API

Na raiz deste repositório existe uma pasta chamada ```insomnia```, que contém a exportação da coleção de requisição da API da aplicação Insomnia.

Junto com o arquivo de exportação que possui um número de versão, existe um arquivo ```note.md``` que é a descrição de cada versão de exportação.

## PADRÕES DE PROJETO

Aqui serão descritos alguns padrões de projeto que estão sendo utilizado, e que podem te ajudar a se localizar melhor na aplicação e fazer as suas implementações seguindo a mesma metodologia.

### GERENCIAMENTO DE BRANCHS DO GIT

Usamos uma metódologia inspirada no [gitflow](https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow), mas de forma mais simplificada, onde temos três tipos de branchs:

- **main:** Ela é a branch principal e consolidada, é ela que deve ser utilizada em produção. Por este motivo não deve ser feito commits nela, nem desenvolver novas funcionalidades ou correções direto nela, tudo deve ser feito nas próximas branchs, e assim que o código for testado e aprovado deve realizar o merge para ela.

- **develop:** É a branch que deve lidar com a união e resolução de conflitos de todas as outras branchs. Ela é uma branch instável, que está em constante modificação. Quando os conflitos são tratados e os testes finalizados, é ela que será mergiada para a **main**.

- **feature/\<nome-da-atualizacao>:** Todas novas funcionalidades da aplicação devem ser desenvolvida em um branch do tipo **feature/...**, após a funcionalidade estar finalizada, deve ser aberto um pull request para a develop receber a funcionalidade e lidar com o merge das branchs.

### ARQUITETURA DE PASTAS

A aplicação utiliza conceitos da arquitetura MVC, utilizado models(aqui denominados de entities: ```src/domain/entities```), views(```src/views```) e controllers (```src/application/controllers```), e também conceitos de pattern SOLID, como a injeção de dependências realizada nas factories(```src/infra/factories```).

Estes conceitos são utilizados para que as responsabilidades de cada parte do código sejam bem seguimentadas, para que possa haver reuso de código, e no caso do SOLID para que possa ter uma maior portabilidade da aplicação diminuindo a dependência das soluções externas.

- **domain**
  
  Para não haver essa dependência, dentro de ```domain``` tem todo o código referente a lógica de negócio, casos de uso e entidades(modelos), e a interface dos repositórios(que é o contrato que um repositório deve cumprir para ser compatível)

- **infra**

  Em ```infra``` tem todo código que possui maior dependência externa, nesta pasta temos a implementação real dos repositórios(que é a comunicação com o banco de dados), utilizando as interfaces descritas em domain.
  
  Como já dito anteriormente, também temos as factories, que fazem a injeção de dependência nos casos de uso, e construção das rotas da aplicação web, da api e do websocket.

- **application**

  Esta pasta é responsável apenas pelos controllers, que é a camada responsável por lidar com as requisições, apontar para os casos de uso que tratarão as lógicas de négocio, e retornar a resposta em JSON no caso da API ou retornar os dados para a view construir a interface.

- **public**

  Guarda apenas arquivos estáticos, como css e imagens.

- **views**
  
  É onde contém todos arquivos de renderização(ejs ou html).