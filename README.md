# App de Receitas

Bem-vindo ao repositório do projeto App de Receitas! 👨‍💻 Este projeto tem como objetivo o desenvolvimento de um aplicativo de receitas utilizando tecnologias modernas do ecossistema React, como Hooks e Context API.

## Habilidades Demonstradas

- Utilização do Redux para gerenciamento de estado
- Utilização da biblioteca React-Redux
- Utilização da Context API do React para gerenciamento de estado
- Utilização dos React Hooks useState, useContext e useEffect
- Criação de Hooks customizados

## Requisitos Atendidos

⚠️ **PULL REQUESTS COM ERROS DE LINTER NÃO SERÃO AVALIADAS. ⚠️**

### Tela de Login (`Login.js`)

1. Elementos desenvolvidos conforme protótipo.
2. Permissão para escrita de email e senha nos campos correspondentes.
3. Formulário válido apenas para email válido e senha com mais de 6 caracteres.
4. Email da pessoa usuária salvo no localStorage após submissão do formulário.
5. Redirecionamento para a tela principal de receitas de comidas após login bem-sucedido.

### Header (`Header.js`)

6. Header implementado conforme necessidade de cada tela.
7. Redirecionamento para a tela de perfil ao clicar no botão de perfil.
8. Implementação do botão de busca com barra de busca que pode ser exibida ou escondida.

### Barra de Busca - Header (`SearchBar.js`)

9. Elementos da barra de busca implementados respeitando o protótipo.
10. Implementação de 3 radio buttons na barra de busca: Ingredient, Name e First letter.
11. Busca na API de comidas/bebidas conforme a página atual.
12. Redirecionamento para a tela de detalhes da receita se apenas uma for encontrada, ou exibição das 12 primeiras.
13. Exibição de alerta se nenhuma receita for encontrada.

### Menu Inferior (`Footer.js`)

16. Menu inferior implementado com ícones para comidas e bebidas.
17. Exibição do menu apenas nas telas indicadas pelo protótipo.
18. Redirecionamento para as telas corretas ao clicar nos ícones.

### Tela Principal de Receitas (`Recipes.js`)

19. Carregamento das 12 primeiras receitas de comidas/bebidas.
20. Implementação dos botões de categoria para filtro.
21. Filtro das receitas por categoria ao clicar no botão.
22. Implementação do filtro como toggle.
23. Redirecionamento para a tela de detalhes da receita ao clicar no card.

### Tela de Detalhes de uma Receita (`RecipeDetails.js`)

24. Request para a API com o id da receita.
25. Desenvolvimento da tela com imagem, título, categoria, ingredientes, instruções, vídeo e recomendações.
26. Implementação das recomendações conforme tipo de receita (comida/bebida).
27. Exibição de 6 cards de recomendação com scroll horizontal.
28. Desenvolvimento do botão "Start Recipe".
29. Ocultação do botão se a receita já foi feita.
30. Alteração do botão para "Continue Recipe" se a receita foi iniciada mas não finalizada.
31. Redirecionamento ao clicar no botão "Start Recipe".
32. Implementação dos botões de compartilhar e favoritar.
33. Cópia do link da receita para o clipboard ao compartilhar.
34. Salvamento das receitas favoritas no localStorage.
35. Mudança do ícone de favorito conforme estado.
36. Alternância do estado do botão de favoritar.

### Tela de Receita em Progresso (`RecipeInProgress.js`)

37. Desenvolvimento da tela com imagem, título, categoria, se é alcoólica ou não, lista de ingredientes e instruções.
38. Implementação de um checkbox para cada item da lista de ingredientes.
39. "Riscar" o nome do ingrediente ao clicar no checkbox.
40. Salvamento do estado do progresso, mantido após atualização ou retorno à mesma receita.
41. Implementação dos botões de compartilhar e favoritar.
42. Habilitação do botão "Finish Recipe" apenas quando todos os ingredientes estiverem "checkados".
43. Redirecionamento ao clicar no botão "Finish Recipe" para a página de receitas feitas.

### Tela de Receitas Feitas (`DoneRecipes.js`)

44. Implementação dos elementos da tela de receitas feitas respeitando o protótipo.
45. Desenvolvimento da tela com foto, nome, categoria, nacionalidade, data de preparo, tags e botão de compartilhar.
46. Desenvolvimento da tela com foto, nome, se é alcoólica, data de preparo e botão de compartilhar.
47. Cópia do link da receita para o clipboard ao compartilhar.
48. Implementação de 2 botões que filtram as receitas por comida ou bebida, e um terceiro que remove todos os filtros.
49. Redirecionamento ao clicar na foto ou no nome da receita para a tela de detalhes da receita.

### Tela de Receitas Favoritas (`FavoriteRecipes.js`)

50. Implementação dos elementos da tela de receitas favoritas respeitando o protótipo.
51. Desenvolvimento da tela com foto, nome, categoria, nacionalidade, botões de compartilhar e "desfavoritar".
52. Desenvolvimento da tela com foto, nome, se é alcoólica, botões de compartilhar e "desfavoritar".
53. Cópia do link da receita para o clipboard ao compartilhar.
54. Remoção da receita da lista de favoritas ao clicar no botão "desfavoritar".
55. Implementação de 2 botões que filtram as receitas por comida ou bebida, e um terceiro que remove todos os filtros.
56. Redirecionamento ao clicar na foto ou no nome da receita para a tela de detalhes da receita.

### Tela de Perfil (`Profile.js`)

57. Implementação dos elementos da tela de perfil respeitando o protótipo.
58. Visualização do email da pessoa usuária.
59. Implementação dos botões "Done Recipes", "Favorite Recipes" e "Logout".
60. Redirecionamento ao clicar no botão "Done Recipes" para a tela de receitas feitas.
61. Redirecionamento ao clicar no botão "Favorite Recipes" para a tela de receitas favoritas.
62. Limpeza do localStorage e redirecionamento à tela de login ao clicar no botão "Logout".
