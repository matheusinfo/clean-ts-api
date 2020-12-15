# Login

> ## Caso de sucesso

1. X Recebe uma requisição do tipo **POST** na rota **/api/login**
2. X Valida dados obrigatórios **email** e **password**
3. X Valida que o campo **email** é um e-mail válido
4. X **Busca** o usuário com o email e senha fornecidos
5. X Gera um **token** de acesso a partir do ID do usuário
6. X **Atualiza** os dados do usuário com o token de acesso gerado
7. X Retorna **200** com o token de acesso e o nome do usuário

> ## Exceções

1. X Retorna erro **404** se a API não existir
2. X Retorna erro **400** se email ou password não forem fornecidos pelo client
3. X Retorna erro **400** se o campo email for um e-mail inválido
4. X Retorna erro **401** se não encontrar um usuário com os dados fornecidos
5. X Retorna erro **500** se der erro ao tentar gerar o token de acesso
6. X Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado