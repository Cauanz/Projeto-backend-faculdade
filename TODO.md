# ROTAS BÁSICAS:
## Rotas paciente:
<!-- # - /pacientes/ (POST) - Cria um novo paciente. -->
<!-- # - /pacientes/login/ (POST) - Realiza o login de um paciente. -->
# - /pacientes/logout/ (POST) - Realiza o logout de um paciente.
<!-- # - /pacientes/ (GET) - Retorna todos os pacientes cadastrados. -->
<!-- # - /pacientes/<id> (GET) - Retorna um paciente específico pelo ID. -->
<!-- # - /pacientes/<id> (PUT) - Atualiza um paciente específico pelo ID. -->
<!-- # - /pacientes/<id> (DELETE) - Remove um paciente específico pelo ID. -->

## Rotas consultas:
# - /consultas/ (POST) - Cria uma nova consulta.
# - /consultas/ (GET) - Retorna todas as consultas cadastradas.
# - /consultas/<id> (GET) - Retorna uma consulta específica pelo ID.
# - /consultas/<id> (PUT) - Atualiza uma consulta específica pelo ID.
# - /consultas/<id> (DELETE) - Remove uma consulta específica pelo ID.
# - /consultas/paciente/<paciente_id> (GET) - Retorna todas as consultas de um paciente específico pelo ID.

## Rotas médicos:
<!-- # - /medicos/ (POST) - Cria um novo médico. -->
<!-- # - /medicos/login (POST) - Realiza o login de um médico. -->
# - /medicos/logout (POST) - Realiza o logout de um médico.
<!-- # - /medicos/ (GET) - Retorna todos os médicos cadastrados. -->
<!-- # - /medicos/<id> (GET) - Retorna um médico específico pelo ID. -->
<!-- # - /medicos/<id> (PUT) - Atualiza um médico específico pelo ID. -->
<!-- # - /medicos/<id> (DELETE) - Remove um médico específico pelo ID. -->
# - /medicos/especialidade/<especialidade> (GET) - Retorna todos os médicos de uma especialidade específica.
# - /medicos/consultas/<medico_id> (GET) - Retorna todas as consultas de um médico específico pelo ID.

## Rotas administração:
<!-- # - /admin/ (POST) - Cria um novo administrador. -->
<!-- # - /admin/login (POST) - Realiza o login de um administrador. -->
# - /admin/logout (POST) - Realiza o logout de um administrador.
<!-- # - /admin/ (GET) - Retorna todos os administradores cadastrados. -->
<!-- # - /admin/<id> (GET) - Retorna um administradore específico pelo ID. -->
<!-- # - /admin/<id> (PUT) - Atualiza um administradore específico pelo ID. -->
<!-- # - /admin/<id> (DELETE) - Remove um administradore   específico pelo ID. -->
# - /admin/ (GET) - Retorna informações administrativas, como número total de pacientes, médicos e consultas.
# - /admin/relatorios/ (GET) - Retorna relatórios administrativos, como consultas agendadas, consultas realizadas, etc.
# - /admin/relatorios/<tipo> (GET) - Retorna um relatório específico pelo tipo (ex: consultas por médico, consultas por paciente, etc.).
# - /admin/relatorios/<tipo>/<periodo> (GET) - Retorna um relatório específico pelo tipo e período (ex: consultas por médico, consultas por paciente, etc.).
# - /admin/relatorios/<tipo>/<periodo>/<medico_id> (GET) - Retorna um relatório específico pelo tipo, período e médico (ex: consultas por médico, consultas por paciente, etc.).
# - /admin/relatorios/<tipo>/<periodo>/<paciente_id> (GET) - Retorna um relatório específico pelo tipo, período e paciente (ex: consultas por médico, consultas por paciente, etc.).
# - /admin/relatorios/<tipo>/<periodo>/<medico_id>/<paciente_id> (GET) - Retorna um relatório específico pelo tipo, período, médico e paciente (ex: consultas por médico, consultas por paciente, etc.).
# - /admin/relatorios/<tipo>/<periodo>/<medico_id>/<paciente_id>/<status> (GET) - Retorna um relatório específico pelo tipo, período, médico, paciente e status (ex: consultas por médico, consultas por paciente, etc.).

