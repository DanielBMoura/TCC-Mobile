const Categoria = require('./Categoria')
const SubCategoria = require('./SubCategoria')
const Produto = require('./Produto')
const Usuario = require('./Usuario')
const Endereco = require('./Endereco')
const Orcamento = require('./Orcamento')
const ItensOrcamento = require('./ItensOrcamento')
const Pedido = require('./Pedido')
const ItensPedido = require('./ItensPedido')

// Definindo os relacionamentos
Categoria.hasMany(SubCategoria, {
    foreignKey: 'id_categoria',
    as: 'subcategorias'
})

SubCategoria.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
    as: 'categoria'
})

SubCategoria.hasMany(Produto, {
    foreignKey: 'id_subCategoria',
    as: 'produtos'
})

Produto.belongsTo(SubCategoria, {
    foreignKey: 'id_subCategoria',
    as: 'subcategoria'
})

Usuario.belongsTo(Endereco, {
    foreignKey: 'id_endereco',
    as: 'endereco'  // Um S alterado, era "enderecos"
})

Orcamento.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuarios'
})

Usuario.hasMany(Orcamento, {
    foreignKey: 'id_usuario',
    as: 'orcamentos'
})

ItensOrcamento.belongsTo(Produto, {
    foreignKey: 'id_produto',
    as: 'produtos'
})

Produto.hasMany(ItensOrcamento, {
    foreignKey: 'id_produto',
    as: 'itensorcamento'
})

Orcamento.hasMany(ItensOrcamento, {
    foreignKey: 'id_orcamento',
    as: 'itensorcamento'
})

ItensOrcamento.belongsTo(Orcamento, {
    foreignKey: 'id_orcamento',
    as: 'orcamentos'
})

Pedido.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    as: 'usuarios'
})

Usuario.hasMany(Pedido, {
    foreignKey: 'id_usuario',
    as: 'pedidos'
})

ItensPedido.belongsTo(Produto, {
    foreignKey: 'id_produto',
    as: 'produtos'
})

Produto.hasMany(ItensPedido, {
    foreignKey: 'id_produto',
    as: 'itenspedidos'
})

Pedido.hasMany(ItensPedido, {
    foreignKey: 'id_pedido',
    as: 'itenspedidos'
})

ItensPedido.belongsTo(Pedido, {
    foreignKey: 'id_pedido',
    as: 'pedidos'
})

module.exports = { 
    Categoria, SubCategoria, Produto, Usuario, Endereco, Orcamento, 
    ItensOrcamento, Pedido, ItensPedido,
}