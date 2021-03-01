export class Category {
    constructor(id, name, description, colorId, colorHex) {
        this.id = id;
        this.name = name;
        this.description = "Antal produkter: " + description;
        this.colorId = colorId;
        this.colorHex = colorHex;
    }
}

export const categoryConverter = {
    toFirestore: function (category) {
        return {
            name: category.name,
            productCount: category.productCount,
            color: {
                id: category.colorId,
                hex: category.colorHex
            }
        };
    },
    fromFirestore: function (snapshot) {
        const id = snapshot.id;
        const data = snapshot.data();
        return new Category(id, data.name, data.productCount, data.color.id, data.color.hex);
    }
};