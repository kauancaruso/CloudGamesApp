import Logo from '../../assets/logo.png';
import soapPack from '../../assets/produtos/soapPack.png'
import ghostZombie from '../../assets/produtos/ghostZombie.jpg'

const produto = {
    topo: {
        titulo: "Detalhes do produto",
    },
    detalhes: {
        nome: "Call of Duty - MW III",
        logo: Logo,
        detalhes: "Na sequência direta do recordista Call of Duty®: Modern Warfare® II, Capitão Price e a Força-tarefa 141 enfrentam a ameaça definitiva.",
        preco: "R$ 299,90",
        botao: "Adicionar ao Carrinho",
    },
    itens: {
        titulo: "Itens do Jogo",
        lista: [
            {
                id: 1,
                nome: "1x Pacote de Operador Soap",
                imagem: soapPack,
            },
            {
                id: 2,
                nome: "1x Skin Ghost Zumbi",
                imagem: ghostZombie,
            }
        ]
    }
}

export default produto;