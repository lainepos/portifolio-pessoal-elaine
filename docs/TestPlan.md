# Casos de Teste — Frontend (Escala Ministerial)

Formato: ID | Cenário | Pré-condição | Passos (resumido) | Resultado esperado

FE01 | Validar login com usuário e senha válidos  
Pré-condição: app aberto em http://localhost:4000, usuário existe.  
Passos: Preencher usuário/senha -> Enviar.  
Resultado: Navega para dashboard; token salvo (localStorage/session); mensagem de sucesso.

FE02 | Validar login com usuário ou senha inválidos  
Pré-condição: app aberto, credenciais inválidas.  
Passos: Preencher credenciais inválidas -> Enviar.  
Resultado: Apresenta erro 401; mostra mensagem de erro correta; não há redirecionamento.

FE03 | Incluir novo ministério (UI)  
Pré-condição: Usuário autenticado com permissão; página ministérios aberta.  
Passos: Abrir form -> Preencher nome -> Submeter.  
Resultado: Novo ministério aparece na lista; requisição POST enviada; notificação de sucesso.

FE04 | Visualizar lista de ministérios  
Pré-condição: Existem ministérios cadastrados.  
Passos: Acessar página de ministérios / recarregar lista.  
Resultado: Lista exibe todos os ministérios com nome e actions (editar/excluir).

FE05 | Incluir novo evento (UI)  
Pré-condição: Usuário autenticado; existem ministérios e pessoas.  
Passos: Abrir form de evento -> Preencher title, date, ministry, atribuir pessoas -> Submeter.  
Resultado: Evento aparece na lista; requisição POST com payload correto; feedback de sucesso.

FE06 | Visualizar evento criado  
Pré-condição: Evento criado.  
Passos: Acessar lista de eventos ou detalhe do evento.  
Resultado: Evento exibe title, date, ministério e nomes das pessoas (não apenas ids).

FE07 | Home: exibir ministérios e eventos agregados  
Pré-condição: Dados existem no backend.  
Passos: Acessar home/dashboard.  
Resultado: Dashboard apresenta cartões/listas de ministérios e próximos eventos; dados consistentes.

FE08 | Criar novo líder (UI)  
Pré-condição: Usuário autenticado.  
Passos: Abrir cadastro de pessoa -> Preencher name, phone, escolher role=leader -> Submeter.  
Resultado: Pessoa criada com role leader; aparece em lista de pessoas; API chamada corretamente.

FE09 | Criar novo membro (UI)  
Pré-condição: Usuário autenticado.  
Passos: Abrir cadastro de pessoa -> Preencher dados com role=member -> Submeter.  
Resultado: Pessoa aparece na lista como member; telefone salvo; notificação de sucesso.

FE10 | Atribuir membro a um evento (UI)  
Pré-condição: Evento e membro existentes.  
Passos: Abrir edição/atribuição de evento -> Selecionar membro -> Salvar.  
Resultado: Membro listado nos assignments do evento; UI atualiza sem recarregar; requisição correta.

FE11 | Impedir mesma pessoa duplicada em um mesmo evento  
Pré-condição: Evento aberto para edição.  
Passos: Tentar adicionar o mesmo membro duas vezes ao evento.  
Resultado: UI evita duplicação (desabilita opção) ou mostra erro do backend; mensagem clara.

FE12 | Impedir membro em mais de um evento no mesmo dia  
Pré-condição: Membro já atribuído a evento na mesma data.  
Passos: Tentar atribuir o mesmo membro a outro evento com mesma data.  
Resultado: Permissão negada; backend retorna erro; UI exibe aviso informando conflito de data.

FE13 | Editar evento (UI)  
Pré-condição: Evento existente; usuário autenticado.  
Passos: Abrir editar -> Alterar campos -> Salvar.  
Resultado: Evento atualizado na UI; chamada PUT/ PATCH realizada; validações mantidas.

FE14 | Excluir evento (UI)  
Pré-condição: Evento existente.  
Passos: Clicar excluir -> Confirmar.  
Resultado: Evento removido da lista; requisição DELETE enviada; notificação de sucesso.

FE15 | Excluir membro (UI)  
Pré-condição: Membro existente (pode estar alocado em eventos).  
Passos: Clicar excluir em pessoa -> Confirmar.  
Resultado: Pessoa removida ou UI solicita ação (remover atribuições primeiro); lista atualizada.

FE16 | Editar cadastro de membro (UI)  
Pré-condição: Membro existente.  
Passos: Abrir editar pessoa -> Alterar name/phone/role -> Salvar.  
Resultado: Dados atualizados na UI; backend refletindo mudanças; notificação de sucesso.

FE17 | Promover membro para líder (alterar role)  
Pré-condição: Membro existente.  
Passos: Editar pessoa -> Alterar role para leader -> Salvar.  
Resultado: Role atualizada; UI mostra novo papel; permissões/visibilidade atualizadas se aplicável.


# Casos de Teste — BackEnd (Escala Ministerial)

BE01 | Validar login com usuário e senha válidos
Pré-condição: Usuário cadastrado; endpoint /api/auth/login disponível.
Passos: Enviar requisição POST com usuário e senha válidos.
Resultado: Autenticação bem-sucedida; retorno de token JWT; código HTTP 200.

BE02 | Validar login com usuário ou senha inválidos
Pré-condição: Credenciais inválidas.
Passos: Enviar POST /api/auth/login com credenciais incorretas.
Resultado: Rejeição da autenticação; mensagem de erro; código HTTP 401.

BE03 | Incluir novo ministério (POST /api/ministries)
Pré-condição: Usuário autenticado; backend em execução.
Passos: Enviar POST com campo name válido.
Resultado: Ministério criado; payload de resposta contém id e name; código HTTP 201.

BE04 | Visualizar lista de ministérios (GET /api/ministries)
Pré-condição: Existem ministérios cadastrados.
Passos: Enviar requisição GET /api/ministries.
Resultado: Retorna lista de ministérios com id e name; código HTTP 200.

BE05 | Incluir novo evento (POST /api/events)
Pré-condição: Usuário autenticado; ministérios e pessoas existentes.
Passos: Enviar POST com title, date, ministryId e assignments.
Resultado: Evento criado; campos obrigatórios validados; código HTTP 201.

BE06 | Visualizar evento criado (GET /api/events ou /api/events/:id)
Pré-condição: Evento existente.
Passos: Enviar GET para listar ou buscar evento pelo id.
Resultado: Retorna evento com dados corretos; assignments incluem personName; código HTTP 200.

BE07 | Listar ministérios e eventos agregados (Home)
Pré-condição: Dados existentes no banco.
Passos: Enviar requisição GET /api/home (ou endpoint equivalente).
Resultado: Retorna ministérios e eventos agregados; dados consistentes; código HTTP 200.

BE08 | Criar novo líder (POST /api/people com role=leader)
Pré-condição: Usuário autenticado.
Passos: Enviar POST com name, phone, role=leader.
Resultado: Pessoa criada com role=leader; resposta contém id; código HTTP 201.

BE09 | Criar novo membro (POST /api/people com role=member)
Pré-condição: Usuário autenticado.
Passos: Enviar POST com name, phone, role=member.
Resultado: Pessoa criada com role=member; telefone salvo; código HTTP 201.

BE10 | Atribuir membro a evento (incluir em assignments)
Pré-condição: Evento e pessoa existentes.
Passos: Enviar PUT /api/events/:id incluindo personId em assignments.
Resultado: Pessoa atribuída ao evento; persistência confirmada; código HTTP 200/201.

BE11 | Impedir mesma pessoa duplicada em um mesmo evento
Pré-condição: Evento existente com membro já atribuído.
Passos: Tentar incluir novamente o mesmo personId no assignment.
Resultado: Retorna erro 400; mensagem de validação indicando duplicidade.

BE12 | Impedir membro em mais de um evento no mesmo dia
Pré-condição: Membro já atribuído a outro evento na mesma data.
Passos: Criar ou editar evento atribuindo o mesmo membro.
Resultado: Backend retorna erro 400 informando conflito de data.

BE13 | Editar evento (PUT /api/events/:id)
Pré-condição: Evento existente.
Passos: Enviar PUT com alterações válidas.
Resultado: Evento atualizado com sucesso; validações aplicadas; código HTTP 200.

BE14 | Excluir evento (DELETE /api/events/:id)
Pré-condição: Evento existente.
Passos: Enviar DELETE para o endpoint do evento.
Resultado: Evento removido; não aparece nas listagens; código HTTP 204 ou 200.

BE15 | Excluir membro (DELETE /api/people/:id)
Pré-condição: Pessoa existente (possivelmente vinculada a eventos).
Passos: Enviar DELETE para o endpoint da pessoa.
Resultado: Pessoa removida e desvinculada; se houver dependência, retorno de mensagem apropriada; código HTTP 204/200.

BE16 | Editar cadastro de membro (PUT /api/people/:id)
Pré-condição: Pessoa existente.
Passos: Enviar PUT com novos dados (name, phone, role, ministries).
Resultado: Dados atualizados; validações aplicadas; código HTTP 200.

BE17 | Promover membro para líder (alterar role para leader)
Pré-condição: Pessoa existente com role=member.
Passos: Enviar PUT alterando role=leader.
Resultado: Role atualizada; permissões e visibilidade ajustadas; código HTTP 200.