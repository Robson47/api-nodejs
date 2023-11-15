const express = require("express");

const categoriaModel = require("../model/Categoria");
const livroModel = require("../model/Livro");

const router = express.Router();

//ROTA DE INSERÇÃO DE CATEGORIA

router.post("/categoria/cadastrarCategoria", (req, res) => {
    let { nome_categoria, tipo_categoria } = req.body;

    //console.log(nome_categoria, tipo_categoria);

    categoriaModel.create({ nome_categoria, tipo_categoria })
        .then(() => {
            return res.status(201).json({
                errorStatus: false,
                messageStatus: "Categoria inserida com êxito!"
            });
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

//ROTA DE LISTAGEM DE CATEGORIA
router.get("/categoria/listarCategoria", (req, res) => {
    categoriaModel.findAll()
        .then((categorias) => {
            return res.status(200).json(categorias);
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

//ROTA DE BUSCA DE CATEGORIA POR ID

router.get("/categoria/listarID/:cod_categoria", (req, res) => {
    let { cod_categoria } = req.params;

    categoriaModel.findByPk(cod_categoria)
        .then((categoria) => {
            if (!categoria) {
                return res.status(404).json({
                    errorStatus: true,
                    messageStatus: "Categoria não encontrada!",
                });
            } else {
                return res.status(200).json(categoria)
            }
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });
});

//ROTA DE ALTERAÇÃO DE CATEGORIA
router.put("/categoria/editarCategoria", (req, res) => {
    let { tipo_categoria, nome_categoria, cod_categoria } = req.body;

    categoriaModel.update(
        { nome_categoria, tipo_categoria },
        { where: { cod_categoria } }
    )
        .then((categoria) => {
            if (categoria == !categoria) {
                return res.status(404).json({
                    errorStatus: true,
                    messageStatus: "Categoria não encontrada!",
                });
            } else {
                return res.status(200).json(`O nome da categoria correspondente pelo código ${cod_categoria} agora é ${nome_categoria}`)
            }
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        })
});

//ROTA DE EXCLUSÃO DE CATEGORIA
router.delete("/categoria/excluirCategoria/:cod_categoria", (req, res) => {
    let {cod_categoria} = req.params;

    categoriaModel.destroy(
        { where: { cod_categoria } }
    )
    .then((categoria) => {
        if (categoria == !categoria) {
            return res.status(404).json({
                errorStatus: true,
                messageStatus: "Categoria não encontrada!",
            });
        } else {
            return res.status(200).json(`O nome da categoria correspondente pelo código ${cod_categoria} foi excluída com sucesso!`)
        }
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    })
});
module.exports = router;