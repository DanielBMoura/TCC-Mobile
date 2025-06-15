// Importa o framework Express para criar o servidor
    const express = require('express')
// Importa a configuração do banco de dados
    const db = require('./config/db')
// Importa os modelos (tabelas) do banco de dados
    const Usuario = require('./models/Usuario')
    const ItensOrcamento = require('./models/ItensOrcamento')
    const Produto = require('./models/Produto')
// Importa as associações entre os modelos
    require('./models/associations')
// Importa recursos do Sequelize para operações no banco
    const { Sequelize, Op, fn, col, literal, where } = require('sequelize')
    const Orcamento = require('./models/Orcamento')
    const Pedido = require('./models/Pedido')
    const ItensPedido = require('./models/ItensPedido')

    const cookieParser = require('cookie-parser')

// Cria uma instância do aplicativo Express
    const app = express()
// Configura o Express para interpretar requisições com corpo JSON
    app.use(express.json())
    app.use(cookieParser())

    const bcrypt = require('bcryptjs') // Adicionado bcryptjs


// Sincroniza os modelos com o banco de dados (cria as tabelas)
    // db.sequelize.sync({ force: true })

// Define uma rota POST para '/login' que recebe requisições de autenticação
app.post('/login', async (req, res) => {

    // Extrai os campos 'email' e 'senha' do corpo da requisição (req.body)
    const { email, senha } = req.body

    // Busca no banco de dados um usuário com o email fornecido e que seja admin (eAdmin: 1)
    const usuarioBd = await Usuario.findOne({ where: { email_usuario: email, eAdmin: 1 } })

    // Se nenhum usuário for encontrado, retorna status 401 (Não Autorizado) com mensagem de erro
    if (!usuarioBd) {
        return res.status(401).json({ mensagem: 'Usuário não encontrado' })
    }

    const senhaValida = await bcrypt.compare(senha, usuarioBd.senha_usuario)

    // Verifica se o email ou senha fornecidos não coincidem com os registrados no banco de dados
    if (email !== usuarioBd.email_usuario || !senhaValida) {
        return res.status(401).json({ mensagem: 'E-mail ou senha incorretos' })
    }

    res.cookie('id_usuario', usuarioBd.id_usuario, {
        httpOnly: true, // O cookie só pode ser acessado pelo servidor
        secure: process.env.NODE_ENV === 'production', // Se estiver em produção, use cookies seguros (HTTPS)
    });

    // Se todas as verificações passarem, retorna status 200 (OK) com mensagem de sucesso
    return res.status(200).json({ mensagem: 'Login bem-sucedido!' })
})

app.post('/logout', async (req, res) => {
  // Verifique se o cookie 'id_usuario' está presente
  const id_usuario = req.cookies.id_usuario;

  console.log('id_usuario:', id_usuario);

  // Limpar o cookie
  res.clearCookie('id_usuario', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  return res.status(200).json({ success: true });
});

// Rota POST para obter dados de produtos em orçamentos (não em andamento)
app.post('/produtos-orcamentos', async (req, res) => {
    // Consulta ao banco de dados usando Sequelize
    const resultados = await ItensOrcamento.findAll({
        // Seleciona apenas os campos específicos com aliases
        attributes: [
            // Pega o nome do produto da tabela relacionada 'produtos'
            [col('produtos.nome_produto'), 'nome_produto'],
            // Soma as quantidades agrupadas por produto
            [fn('SUM', col('quantidade_itemOrcamento')), 'quantidade_total']
        ],
        
        // Inclui tabelas relacionadas
        include: [
            {
                model: Produto,
                as: 'produtos',  // Alias para a relação
                attributes: []   // Não retorna outros campos do produto
            },
            {
                model: Orcamento,
                as: 'orcamentos',
                attributes: [],
                // Filtra apenas orçamentos com status diferente de "Em andamento"
                where: {
                    status_orcamento: {
                        [Op.ne]: 'Em andamento'  // Op.ne = operador "not equal"
                    }
                }
            }
        ],
        
        // Agrupa os resultados por nome do produto
        group: ['produtos.nome_produto'],
        // Ordena pela soma da quantidade em ordem decrescente
        order: [[fn('SUM', col('quantidade_itemOrcamento')), 'DESC']]
    })

    // Transforma os resultados para o formato necessário pelo gráfico
    const dadosParaGrafico = resultados.map(item => ({
        nome: item.getDataValue('nome_produto'),         // Extrai o nome do produto
        quantidade: item.getDataValue('quantidade_total') // Extrai a quantidade total
    }))

    // Retorna os dados formatados como JSON
    return res.json(dadosParaGrafico)
})

// Rota POST para obter estatísticas de orçamentos por dia da semana
app.post('/produtos-data', async (req, res) => {
    // Consulta ao banco de dados usando Sequelize
    const resultados = await Orcamento.findAll({
        // Seleciona e calcula os campos necessários
        attributes: [
            // Extrai o dia da semana da data (1=domingo, 2=segunda, etc.)
            [fn('DAYOFWEEK', col('data_orcamento')), 'diaSemana'],
            // Conta o total de orçamentos por dia da semana
            [fn('COUNT', col('id_orcamento')), 'totalOrcamentos'],
        ],
        
        // Agrupa os resultados por dia da semana
        group: [fn('DAYOFWEEK', col('data_orcamento'))],
        
        // Ordena pelos dias da semana em ordem crescente
        order: [
            [fn('DAYOFWEEK', col('data_orcamento')), 'ASC']
        ],
        
        // Retorna apenas dados puros (sem objetos Sequelize)
        raw: true
    })

    // Log dos resultados para debug (pode ser removido em produção)
    console.log(resultados)

    // Retorna os dados como JSON
    res.json(resultados)
})

app.post('/vendas-gerais', async (req, res) => {
    const totalVendas = await Pedido.sum('valor_total_pedido')

    const produtosMaisVendidos = await ItensPedido.findAll({
        attributes: [
            [col('produtos.nome_produto'), 'nome_produto'],
            [fn('SUM', col('quantidade_itemPedido')), 'quantidade_total']
        ],
        include: [{
            model: Produto,
            as: 'produtos',
            attributes: []
        }],
        group: ['produtos.nome_produto'],
        order: [[fn('SUM', col('quantidade_itemPedido')), 'DESC']]
    });

    // Formatar os dados de resposta
    const response = {
        valor_total_vendas: totalVendas || 0,
        produtos_mais_vendidos: produtosMaisVendidos.map(item => ({
            nome_produto: item.getDataValue('nome_produto'), // Forma mais segura de acessar
            quantidade_vendida: item.getDataValue('quantidade_total') // Corrigido para 'quantidade_total'
        }))
    };

    console.log(response)

    res.status(200).json(response)
})

app.post('/orcamentos', async (req, res) => {
    const orcamentos = await Orcamento.findAll({
        where: {
            status_orcamento: 'Aguardando resposta do cliente'
        },
        include: [
            {
                model: ItensOrcamento,
                as: 'itensorcamento',
                attributes: ['quantidade_itemOrcamento'],
                include: [
                    {
                        model: Produto,
                        as: 'produtos',
                        attributes: ['nome_produto']
                    }
                ]
            },
            {
                model: Usuario,
                as: 'usuarios',
                attributes: ['id_usuario', 'nome_usuario']
            }
        ],
        attributes: ['id_orcamento', 'data_orcamento']
    })

    const dadosObjeto = orcamentos.map(orcamento => ({
        id_orcamento: orcamento.id_orcamento,
        data_orcamento: orcamento.data_orcamento,
        id_usuario: orcamento.usuarios.id_usuario,
        nome_usuario: orcamento.usuarios.nome_usuario,
        itens: orcamento.itensorcamento.map(item => ({
            quantidade: item.quantidade_itemOrcamento,
            nome_produto: item.produtos.nome_produto
        }))
    }));

    res.json(dadosObjeto)
})

app.post('/AprovarRecusar', async (req, res) => {
    const id_orcamento = req.body.id_orcamento
    const acao = req.body.acao
    let valor = req.body.valor
    const id_usuario = req.body.id_usuario
    const itensOrcamento = req.body.itens

    console.log(valor)

    if (valor) {
            // Converte a string para número
            valor = parseFloat(valor);
            
            // Garante que é um número válido
            if (isNaN(valor)) {
                valor = 0;
            }
            
            // Arredonda para 2 casas decimais para evitar problemas de precisão
            valor = Math.round(valor * 100) / 100;
        } else {
            valor = 0;
        }

    console.log(valor)

    if (acao == 'Aprovar') {

        const novoPedido = await Pedido.create({
            valor_total_pedido: valor,
            id_usuario: id_usuario
        })

        if (Array.isArray(itensOrcamento)) {
            for (const item of itensOrcamento) {
                const produto = await Produto.findOne({ 
                    where: { nome_produto: item.nome_produto } 
                });

                if (produto) {
                    await ItensPedido.create({
                        quantidade_itemPedido: item.quantidade,
                        id_produto: produto.id_produto,
                        id_pedido: novoPedido.id_pedido
                    });
                }
            }
        }

        const aprovarRecusar = await Orcamento.update({
        status_orcamento: 'Fechado'
        }, { where: { id_orcamento: id_orcamento } })

        res.json({acao: 'Aprovado'})
    }

    if (acao == 'Recusar') {
        const aprovarRecusar = await Orcamento.update({
        status_orcamento: 'Cancelado'
        }, { where: { id_orcamento: id_orcamento } })

        res.json({acao: 'Recusado'})
    }
})

app.post('/Usuarios', async (req, res) => {
    const id_usuario = req.cookies.id_usuario

    const usuario = await Usuario.findOne({
        where: { id_usuario: id_usuario }
    })

    res.json(usuario)
})

app.post('/AlterarUsuario', async (req, res) => {
    const { id_usuario, nome_usuario, email_usuario, telefone_usuario, senha_usuario } = req.body

    let erros = []

    const caracteresInvalidos = [    
        '!', '"', '#', '$', '%', '&', "'", '*', '+', ',', '-', '.', '/',
        ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|',
        '}', '~', '´', '¨', '¿', '¡','\n', '\r', '\t'
    ]

    const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+(?<!\.)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    const emailExistente = await Usuario.findOne({ where: { email_usuario: email_usuario } })

    const letraMaiuscula = /[A-Z]/
    const letraMinuscula = /[a-z]/
    const numeros = /\d/
    const caractereEspecial = /[!@#$%^&*(),.?":{}|<>[\]~_+;='-]/

    const telefoneLimpo = telefone_usuario.replace(/[()-]/g, "")
    console.log(telefoneLimpo)
    const telefoneExistente = await Usuario.findOne({ where: { telefone_usuario: telefoneLimpo } })
    const ddds = [
         "61", "62", "64", "65", "66", "67", "82", "71", "73", "74", "75", 
        "77", "85", "88", "98", "99", "83", "81", "87", "86", "89", "84", 
        "79", "68", "96", "92", "97", "91", "93", "94", "69", "95", "63",
        "27", "28", "31", "32", "33", "34", "35", "37", "38", "21", "22", 
        "24", "11", "12", "13", "14", "15", "16", "17", "18", "19", "41", 
        "42", "43", "44", "45", "46", "51", "53", "54", "55", "47", "48", "49"
    ]


    const usuarioExistente = await Usuario.findOne({
        where: {
            id_usuario: id_usuario
        }
    })
    
    const enviouNovaSenha = senha_usuario && senha_usuario.trim() !== '';
    let senhaFoiAlterada = false;

    if (enviouNovaSenha) {
        senhaFoiAlterada = !(await bcrypt.compare(senha_usuario, usuarioExistente.senha_usuario));
    }

    for (let i = 0; i < nome_usuario.length; i++) {
        if (caracteresInvalidos.includes(nome_usuario[i])) {
            erros.push({mensagem: 'Nome inválido - Possui caracteres inválidos'})
        }
    }

    if (!emailRegex.test(email_usuario)) {
        erros.push({mensagem: 'Email inválido - Não possui o formato comum de um email'})
    }

    if (email_usuario.length > 254) {
        erros.push({mensagem: 'Email inválido - Maior que o possivel'})
    }

    if (emailExistente && emailExistente.id_usuario !== id_usuario) {
        erros.push({ mensagem: 'Email inválido - Email já está cadastrado' });
    }

    if (enviouNovaSenha) {
        if (!letraMaiuscula.test(senha_usuario)) {
            erros.push({mensagem: 'Senha inválida - A senha precisa conter uma letra maiúscula'});
        }

        if (!letraMinuscula.test(senha_usuario)) {
            erros.push({mensagem: 'Senha inválida - A senha precisa conter uma letra minúscula'});
        }

        if (!numeros.test(senha_usuario)) {
            erros.push({mensagem: 'Senha inválida - A senha precisa conter números'});
        }

        if (!caractereEspecial.test(senha_usuario)) {
            erros.push({mensagem: 'Senha inválida - A senha precisa conter um caractere especial'});
        }

        if (senha_usuario.length < 8) {
            erros.push({mensagem: 'Senha inválida - A senha é curta'});
        }

        if (senha_usuario.length > 64) {
            erros.push({mensagem: 'Senha inválida - A senha é longa'});
        }
    }

    if (telefoneLimpo.length < 10 ) {
        erros.push({mensagem: 'Telefone inválido - Telefone muito curto'})
    }

    if (telefoneLimpo.length > 11) {
        erros.push({mensagem: 'Telefone inválido - Telefone muito longo'})
    }

    if (telefoneExistente && telefoneExistente.id_usuario !== id_usuario) {
        erros.push({ mensagem: 'Telefone inválido - Telefone já está cadastrado' });
    }

    if (!ddds.includes(telefoneLimpo.slice(0, 2))) {
        erros.push({mensagem: 'Telefone inválido - DDD inválido'})
    }

    const senhaIgual = !enviouNovaSenha || !senhaFoiAlterada;

    if (usuarioExistente.nome_usuario === nome_usuario && usuarioExistente.email_usuario === email_usuario && 
        usuarioExistente.telefone_usuario === telefoneLimpo && senhaIgual) {
        erros.push({mensagem: 'Nenhuma alteração feita'});
    }

    if (erros.length > 0) {
        res.status(400).json(erros[0])
    } else {
        const dadosAtualizacao = {
            nome_usuario: nome_usuario,
            email_usuario: email_usuario,
            telefone_usuario: telefoneLimpo
        }
        // const usuarioAtualizado = await Usuario.update(
        //     {
        //         nome_usuario: nome_usuario,
        //         email_usuario: email_usuario,
        //         telefone_usuario: telefoneLimpo
        //     },
        //     {
        //         where: { id_usuario: id_usuario }
        //     }
        // )

        // Se a senha foi alterada, hash a nova senha
        if (enviouNovaSenha) {
            const salt = await bcrypt.genSalt(10);
            dadosAtualizacao.senha_usuario = await bcrypt.hash(senha_usuario, salt);
        } else {
            // Mantém a senha existente (já está hasheada)
            dadosAtualizacao.senha_usuario = usuarioExistente.senha_usuario;
        }

        await Usuario.update(dadosAtualizacao, {
            where: { id_usuario: id_usuario }
        });

        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
    }
})

// Define a porta em que o servidor vai rodar
const PORT = 3000;

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
    // Callback executado quando o servidor inicia com sucesso
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    // Mensagem exibida no terminal com o link de acesso local
});