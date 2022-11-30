const fs = require('fs')

class ProductManager {
    constructor(fileName){
        this.fileName = fileName
        this.format = 'utf-8'
    }

     generateID = async () => {
        const data = await this.getProduct()
        const count = data.length

        if (count == 0) return 1;

        const lastProduct = data[count - 1]
        const lastID = lastProduct.id
        const nextID = lastID + 1

        return nextID
    }

    addProduct = async (title, description, price, thumbnail, stock, code) => {
        const id = await this.generateID()

        return this.getProduct()
            .then(products => {
                products.push({id, title, description, price, thumbnail, stock, code})
                return products
            })
            .then(productsNew => fs.promises.writeFile(this.fileName, JSON.stringify(productsNew)))
    }

    getProductById = async (id) => {
        const data = await this.getProduct()
        const productFound = data.find(product => product.id === id)
        return productFound || console.log(`ERROR: EL PRODUCTO CON EL ID "${id}" NO EXISTE.`);
    }

    getProduct = async () => {
        const product = fs.promises.readFile(this.fileName, this.format)
        return product
            .then(content => JSON.parse(content))
            .catch(e => {if(e) return []})
    }

    eliminarProduct = async (id) => {
        const data = await this.getProduct()
        const toBeDeleted = data.find(product => product.id === id)

        if(toBeDeleted){
            const index = data.indexOf(toBeDeleted)
            data.splice(index, 1);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data))
            console.log(`\n\nPRODUCTO ELIMINADO: ID "${id}".`);
        } else {
            console.log(`\n\nERROR AL ELIMINAR PRODUCTO: EL PRODUCTO CON EL ID "${id}" NO SE ENCUENTRA EN LA LISTA.`);
        }
    }

    updateProduct = async (id) => {
        const data = await this.getProduct()
        const toBeUpdated = data.find(product => product.id === id)

        toBeUpdated["title"] = "PRODUCTO ACTUALIZADO"
        toBeUpdated["stock"] = 150
        
        fs.writeFileSync(this.fileName, JSON.stringify(data))
    }

}

// falta vaciar todo el carrito y verificar code

async function run(){
    const manager = new ProductManager('./products.json')
    await manager.addProduct('remera', 'rosa', 1500, "sin imagen", 12, 'zde12')
    await manager.addProduct('gorro', 'negro', 2500, "sin imagen", 2, 'trd82')
    await manager.addProduct('patalon', 'negro', 3500, "sin imagen", 4, 'trd89')
    await manager.addProduct('campera', 'azul', 4500, "sin imagen", 21, 'eqw16')
    await manager.addProduct('short', 'morado', 5500, "sin imagen", 21, 'zee19')
    await manager.eliminarProduct(2);
    await manager.updateProduct(4)

    console.log("---------------------------------PRODUCTOS AGREGADOS:\n");
    console.log(await manager.getProduct(2));
    console.log("---------------------------------\nPRODUCTO SELECCIONADO:");
    console.log(await manager.getProductById(3));
    console.log("---------------------------------")
    console.log(await manager.getProductById(50));
    
}

run()