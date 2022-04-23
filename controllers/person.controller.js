const Person = require("../models/Person");
const {Op} = require("sequelize");


const PersonController = {
    async listar(req, res) {
        const { termo, page = 1 } = req.query; // page = 1 para caso nao receber nada, esse é o valor padrão / valor default
        const limit = 10;
        const offset = limit * (parseInt(page) -1); //usa o parseint para converter; o page vem por string e converte em número// faz -1 pq 1 ele mostra a página 2. teria q ser 0 para a número 1
    
        const filter = {
            limit,
            offset,
            attributes: ["person_name"], // para mostrar só o q precisa (ex. senão precisa do id, não tem pq mostrar)
        };
    
        if (termo) {
          Object.assign(filter, {
            where: {
              //person_name: { [Op.like]: `%${termo}%` },
              person_name: { [Op.substring]: termo },
            },
          })
        }
    
        const Persons = await Person.findAll(filter);
    
        res.json(Persons);
      },
    

    async atualizar(req, res) {
        const {
            id
        } = req.params;
        const {
            nome
        } = req.body;

        await Person.update({
            person_name: nome,
        }, {
            where: {
                person_id: id,
            },
        });
        const personUpdated = await Person.findByPk(id);

        return res.json(personUpdated);
    },


};


module.exports = PersonController;