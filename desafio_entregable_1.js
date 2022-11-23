class ProductManager{
    #precioBaseDeGanancia
    constructor(){
        this.products=[]
        this.precioBaseDeGanancia=0.15
    }
    getEvents=()=>{return this.products}
    //Consigue el siguiente ID
    getNextID=()=>{
        const count=this.products.length
        if(count==0) return 1
        const lastEvent=this.products[count-1]
        const lastID=lastEvent.id
        const nextID=lastID+1
        // const nextID = (amount > 0) ? this.products[amount - 1].id + 1 : 1;
            return nextID
        
    }
    getcode=()=>{
        const count=this.products.length
        if(count==0) return 1
        const lastEvent=this.products[count-1]
        const lastID=lastEvent.id
        const nextID=lastID+1
        // const nextID = (amount > 0) ? this.products[amount - 1].id + 1 : 1;
            return nextID
    }

    addProduct=(title, description, price,thumbnail, stock)=>{
        const id=this.getNextID()
        const code=this.getcode()
        const event={
            id,
            title,
            description,
            priceBase:price,
            price:price*(1+ this.#precioBaseDeGanancia),
            thumbnail:thumbnail ??'Sin imagen',
            code,
            stock :stock ??50
        }
        this.products.push(event)
        
    }
    addcode=(eventID,code)=>{
        const event=this.products.find(event=>event.id==eventID)
        return event.some(e=>e.codigo === code); 
    }
    // addParticipant=(eventID, userID)=>{
    //     const event=this.products.find(event=>event.id==eventID)
    //     if(event==undefined)return-1
    //     if(!event.code.includes(userID)){
    //         event.code.push(userID)
    //         return 1
    //     }
    //     return -1
    // }



    // ponerEventoEnGira = (eventID, descriptionNew) => {
    //     const event = this.products.find(event => event.id == eventID)
    //     const { title, priceBase, stock,thumbnail  } = event
    //     this.addProduct(title, descriptionNew, priceBase, thumbnail, stock )
    // }
}
const ticketManager=new ProductManager()
console.log(ticketManager.addProduct('remera','corto rosa',120,0,30,23))
console.log(ticketManager.addProduct('gorra','azul x',100,0,30,23))
console.log(ticketManager.addProduct('pera',100,0,0))

// console.log(ticketManager.addcode(1,333))
// console.log(ticketManager.addcode(3,444))
// console.log(ticketManager.addcode(1,333))
// ticketManager.addParticipant(2,'German')
// ticketManager.addParticipant(2,'Facundo')
// ticketManager.ponerEventoEnGira(1,'Buenos Aires',null)

console.log(ticketManager.products)