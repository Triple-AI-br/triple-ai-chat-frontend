# Começando com o Create React App - FrontEnd TripleAI

## Geral:

Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app).

## Variáveis de ambiente

- Garanta que essas 3 varáveis estejam definidas, segue um exemplo abaixo:

```bash
REACT_APP_BASE_FRONT_URL="http://localhost:3000"
REACT_APP_BASE_API_URL="http://localhost:8000"
REACT_APP_GOOGLE_CLIENT_ID="12346789-some_hash.apps.googleusercontent.com"
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `yarn start`

Inicia o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada se você fizer edições.\
Você também verá quaisquer erros de lint no console.

### `yarn build`

Compila o aplicativo para produção na pasta `build`.\
Ele agrupa corretamente o React no modo de produção e otimiza a compilação para melhor desempenho.

A compilação é minificada e os nomes de arquivo incluem hashes.\
Seu aplicativo está pronto para ser implantado!

---

## `Fazer um commit`

Para manter a boa prática de desenvolvimento, faça commits frequêntes de uma tarefa.\
Antes de subir o código com `git push`, faça:

- O build da aplicação (`yarn build`) para garantir que não ocorrerá erros no deploy;
- Puxe todas as mudanças da branch de _staging_ (`git pull origin staging`) para verificar se há conflitos e se houver, conseguir corrigí-los

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

## Regras de negócio:

### Tipos de usuários:

- Admin
- SuperUser
- User

### O que cada usuário pode fazer de especial?

**Admin**:

- Pode administrar usuários que terão acesso à plataforma;
- Tem acesso à todos os projetos públicos e os de propriedade dele;
- Realizar upload e deleção de arquivos em todos os projetos públicos e os de propriedade dele;

**SuperUser**:

- Tem acesso à todos os projetos públicos e os de propriedade dele;
- Realizar upload e deleção de arquivos em todos os projetos públicos e os de propriedade dele;
- Pode deletar, editar e convidar membros em todos os projetos que aparecem para ele;
- Pode criar, editar e deletar Customers;

**User**:

- Tem acesso somente aos projetos públicos, os privados que ele foi convidado e os de propriedade dele;
- Pode deletar, editar e convidar membros apenas no projeto de propriedade dele;
- Realizar upload e deleção de arquivos em todos os projetos em que foi convidado e dado permissão para tal ação e nos projetos de propriedade dele;
