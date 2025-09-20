import { ICategory, IProduct } from '../types';

export class UrbanMarketCatalogService {
    private readonly categories: ICategory[] = [
        {
            id: 'tea',
            title: 'Ароматные чаи',
            description:
                'Подборка авторских улунов и травяных смесей, которые прогреют и наполнят ароматами городской оранжереи.',
            mood: '🌿',
        },
        {
            id: 'dessert',
            title: 'Десерты без спешки',
            description:
                'Домашние тарты и десерты, которые мы печём малыми партиями к каждому вечеру дегустаций.',
            mood: '🍰',
        },
    ];

    private readonly products: IProduct[] = [
        {
            id: 'tea-mango-oolong',
            categoryId: 'tea',
            title: 'Манговый улун «Летний балкон»',
            description:
                'Лёгкий ферментированный улун с кусочками сушёного манго и лепестками календулы.',
            price: 790,
            tastingNotes: [
                'сладость манго',
                'флёр цитрусовой корки',
                'мягкое сливочное послевкусие',
            ],
        },
        {
            id: 'tea-bergamot-green',
            categoryId: 'tea',
            title: 'Зелёный чай с бергамотом «Лампа Эдисона»',
            description:
                'Бодрящий купаж сенчи и жёлтого чая с эфирными маслами бергамота и василька.',
            price: 640,
            tastingNotes: [
                'пряный цитрус',
                'лёгкая терпкость',
                'долгий медовый шлейф',
            ],
        },
        {
            id: 'dessert-lavender-tart',
            categoryId: 'dessert',
            title: 'Лавандовый тарт с голубикой',
            description:
                'Рассыпчатое тесто, заварной крем с инфузией лаванды и свежая голубика.',
            price: 420,
            tastingNotes: ['лаванда', 'сливки', 'ягодная свежесть'],
        },
        {
            id: 'dessert-salted-caramel',
            categoryId: 'dessert',
            title: 'Мини-чизкейк с солёной карамелью',
            description:
                'Классический чизкейк Нью-Йорк в мини-формате с домашней карамелью.',
            price: 360,
            tastingNotes: [
                'сливочный сыр',
                'солёная карамель',
                'хруст печенья',
            ],
        },
    ];

    public listCategories(): ICategory[] {
        return [...this.categories];
    }

    public getCategory(categoryId: string): ICategory | undefined {
        return this.categories.find((category) => category.id === categoryId);
    }

    public listProductsByCategory(categoryId: string): IProduct[] {
        return this.products.filter(
            (product) => product.categoryId === categoryId,
        );
    }

    public getProduct(productId: string): IProduct | undefined {
        return this.products.find((product) => product.id === productId);
    }

    public formatProductCard(product: IProduct): string {
        const notes = product.tastingNotes.map((n) => `• ${n}`).join('\n');

        return [
            `*${product.title}* — ${product.price} ₽`,
            '',
            product.description,
            '',
            'Ноты дегустации:',
            notes,
        ]
            .filter(Boolean)
            .join('\n');
    }
}
