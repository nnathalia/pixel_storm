import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutosService {

    getAll() {
        return [
            {
                id: 1,
                nome: 'League of Legends',
                descricao: ' MOBA competitivo com personagens únicos.',
                preco: 'Gratuito',
                dev: 'Riot Games',
                genero: 'MOBA',
                lanc: '27/10/2009',
                platforma: 'PC'

            },

            {
                id: 2,
                nome: '	Fortnite',
                descricao: ' Battle Royale com construção e ação intensa.',
                preco: 'Gratuito',
                dev: 'Epic Games  ',
                genero: 'Battle Royale',
                lanc: '21/07/2017',
                platforma: 'PC, Console'

            },
            
            {
                id: 2,
                nome: '	Fortnite',
                descricao: ' Battle Royale com construção e ação intensa.',
                preco: 'Gratuito',
                dev: 'Epic Games  ',
                genero: 'Battle Royale',
                lanc: '21/07/2017',
                platforma: 'PC, Console'

            },

            {
                id: 3,
                nome: '	Minecraft',
                descricao: ' Jogo de criação e exploração em mundo aberto.',
                preco: '$29.99',
                dev: 'Mojang Studios',
                genero: 'Aventura',
                lanc: '18/11/2011',
                platforma: 'PC, Console',

            },

        ]
    }
}
