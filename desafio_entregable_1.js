class ProductManager{
    constructor(){
        this.products=[]
    }
    getProducts=()=>{return this.products}
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
        return parseInt(Math.random() * 1000) 
    }

    addProduct=(title,description,price,thumbnail,code,stock)=>{
        const id=this.getNextID()
        
        // const code=this.getcode()
        const event={
            id,
            title,
            description,
            price,
            thumbnail:thumbnail ??'Sin imagen',
            code,
            stock :stock ??50
            
        }
        //se repite code
        const sameId = element => element != event.code
        const hda=this.products.some(sameId)
        console.log(hda)
            this.products.push(event)
        
        
    }

    // addcode=(eventID,code)=>{
    //     const event=this.products.find(event=>event.id==eventID)
    //     return event.some(e=>e.codigo === code); 
    // }

    getProductById=(eventID)=>{
        const event=this.products.filter(product=>product.id==eventID)
        console.log(event)
        if(event.length===0){
            return `no exite`
        }else{
            return `existe`
        }
    }
}

const productos=new ProductManager()
productos.addProduct('short','blanco',400,null,5,23)
productos.addProduct('remera','corto rosa',120,null,1,20)
productos.addProduct('campera','azul x',100,null,5,4)
productos.addProduct('pantalon','negro',521,null,3,29)


console.log(productos.products)
//buscar por id
console.log(productos.getProductById(6))