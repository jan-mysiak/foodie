export class Color {
    constructor(id, hex) {
        this.id = id;
        this.hex = hex;
    }
    toString() {
        return this.id + ', ' + this.hex;
    }
}

export const colorConverter = {
    toFirestore: function (color) {
        return {
            id: color.id,
            hex: color.hex
        };
    },
    fromFirestore: function (snapshot) {
        const id = snapshot.id;
        const data = snapshot.data();
        return new Color(id, data.hex);
    }
};