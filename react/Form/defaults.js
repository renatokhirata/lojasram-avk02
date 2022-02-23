export default {
    inputs: {
        name: {
            name: "Nome",
            type: "input",
            required: true
        },
        email: {
            name: "E-mail",
            type: "input",
            required: true
        },
        tel: {
            name: "Telefone",
            type: "input",
            required: true
        },
        subject: {
            name: "Assunto",
            type: "input",
            required: true
        },
        contactType: {
            name: "Tipo de contato",
            type: "select",
            required: true,
            options: [
                "Consumidor",
                "Lojista",
                "OEM"
            ]
        },
        department: {
            name: "Departamento",
            type: "select",
            required: true,
            options: [
                "Problema de produto",
                "Troca e devolução",
                "Quero ser uma revenda",
                "Fale Conosco"
            ]
        },
        msg: {
            name: "Mensagem",
            type: "textarea",
            required: true,
        }
    }
};