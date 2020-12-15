# Cadastro (✅)

> ## Caso de sucesso

1. X Recebe uma requisição do tipo **POST** na rota **/api/signup**
2. X Valida dados obrigatórios **name**, **email**, **password** e **passwordConfirmation**
3. X Valida que **password** e **passwordConfirmation** são iguais
4. X Valida que o campo **email** é um e-mail válido
5. X **Valida** se já existe um usuário com o email fornecido
6. X Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
7. X **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
8. X Gera um **token** de acesso a partir do ID do usuário
9. X **Atualiza** os dados do usuário com o token de acesso gerado
10. X Retorna **200** com o token de acesso e o nome do usuário

> ## Exceções

1. X Retorna erro **404** se a API não existir
2. X Retorna erro **400** se name, email, password ou passwordConfirmation não forem fornecidos pelo client
3. X Retorna erro **400** se password e passwordConfirmation não forem iguais
4. X Retorna erro **400** se o campo email for um e-mail inválido
5. X Retorna erro **403** se o email fornecido já estiver em uso
6. X Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
7. X Retorna erro **500** se der erro ao tentar criar a conta do usuário
8. X Retorna erro **500** se der erro ao tentar gerar o token de acesso
9. X Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado