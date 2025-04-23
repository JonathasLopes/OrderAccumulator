# OrderAccumulator

**OrderAccumulator** é uma aplicação backend desenvolvida para um processo seletivo que lida com a acumulação de valores e o processamento de pedidos.

## Descrição

Este projeto coleta e processa dados de pedidos por meio de um pipeline backend estruturado. Utiliza uma arquitetura em camadas para separar claramente as responsabilidades: desde a autenticação até o acesso ao banco de dados e entidades de negócio.

## Técnicas Notáveis

- **[Interfaces do TypeScript](https://www.typescriptlang.org/docs/handbook/2/objects.html)**: Usadas extensivamente para garantir segurança de tipos e contratos entre módulos.
- **[Injeção de Dependência](https://www.typescriptlang.org/docs/handbook/decorators.html)**: Facilita testes e melhora a modularidade, especialmente nas camadas de serviço e repositório.
- **[Códigos de status HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)**: O tratamento explícito de respostas melhora a clareza da API e o diagnóstico de erros.
- **Padrão de tratamento de erros**: Estrutura consistente de try-catch nos controladores para isolar a lógica e evidenciar erros precisos.

## Tecnologias Usadas

- **[Mongoose](https://mongoosejs.com/)**: ODM para MongoDB usado para definir esquemas, gerenciar relacionamentos e simplificar interações com o banco de dados.
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**: Para autenticação baseada em tokens e gerenciamento de sessões de usuário.

## Estrutura do Projeto

```
OrderAccumulator/
├── src/
│   ├── Authentications/
│   ├── Controllers/
│   ├── Database/
│   ├── Entities/
│   ├── Enums/
│   ├── Helpers/
│   ├── Interfaces/
│   ├── Models/
│   ├── Repositories/
│   ├── Types/
│   ├── endpoints.ts
│   ├── global.d.ts
│   └── index.ts
```

### Descrição dos Diretórios

- **Authentications/**: Lida com a lógica de login e validação de tokens.
- **Controllers/**: Ponto de entrada para requisições HTTP, processa entradas e retorna respostas.
- **Database/**: Gerencia a conexão e a lógica de inicialização do banco de dados.
- **Entities/**: Contém objetos de domínio que representam as estruturas principais de dados.
- **Enums/**: Tipos enumerados para conjuntos de valores consistentes na aplicação.
- **Helpers/**: Funções utilitárias compartilhadas entre os módulos.
- **Interfaces/**: Interfaces TypeScript usadas em todo o código.
- **Models/**: Modelos ORM usados para persistência de dados.
- **Repositories/**: Abstrai as operações com o banco de dados, usados por serviços ou controladores.
- **Types/**: Contém definições de tipos compartilhados.
