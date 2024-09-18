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