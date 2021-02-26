export class Product {
    constructor(id, name, categoryId, description, colorId, colorHex) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.description = description;
        this.colorId = colorId;
        this.colorHex = colorHex;
    }
}

export const productConverter = {
    toFirestore: function (product) {

    },
    fromFirestore: function (snapshot) {
        const id = snapshot.id;
        const data = snapshot.data();
        return new Product(
            id,
            data.name,
            data.category.id,
            data.category.name,
            data.category.color.id,
            data.category.color.hex
        );
    }
};