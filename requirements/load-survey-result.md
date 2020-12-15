# Resultado da enquete

> ## Caso de sucesso

1. X Recebe uma requisição do tipo **GET** na rota **/api/surveys/{survey_id}/results**
2. X Valida se a requisição foi feita por um **usuário**
3. X Retorna **200** com os dados do resultado da enquete

> ## Exceções

1. X Retorna erro **404** se a API não existir
2. X Retorna erro **403** se não for um usuário
3. X Retorna erro **500** se der erro ao tentar listar o resultado da enquete