export class Grocery {
    constructor(id, description, productId, productName, colorHex) {
        this.id = id;
        this.description = description;
        this.productId = productId;
        this.name = productName;
        this.colorHex = colorHex;
    }
}

export const groceryConverter = {
    toFirestore: function (grocery) {

    },
    fromFirestore: function (snapshot) {
        const id = snapshot.id;
        const data = snapshot.data();
        return new Grocery(
            id,
            data.description,
            data.product.id,
            data.product.name,
            data.product.category.color.hex,
        );
    }
};