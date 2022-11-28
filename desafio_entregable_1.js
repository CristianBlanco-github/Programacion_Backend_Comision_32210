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
    
    //Validar campos
    validarCampos = (title, description, price, thumbnail, stock, code) =>{
        if((title == undefined || title == "") || (description == undefined || description == "") || (price == undefined ||price == "") || ( thumbnail== "") || (code == undefined) || (stock == undefined || stock == "")){
            console.log("ERROR: TODOS LOS CAMPOS SON OBLIGATORIOS")
            return false;
        }else{
            return true;
        }
    }

    addProduct=(title, description, price,thumbnail,code,stock)=>{
        const id=this.getNextID()
        const event={
            id,
            title,
            description,
            price,
            thumbnail:thumbnail ??'Sin imagen',
            code,
            stock :stock ??50
            
        }
        //verificar si el code se repite
        let samecode = (element) => element.code === code
        if (!this.products.some(samecode)&& this.validarCampos(title, description, price, thumbnail, code, stock)) {
            this.products.push(event)
        } else {
            console.log("An code is duplicated")
        }
    }

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
//Agregar productos
const productos=new ProductManager()
productos.addProduct('remera','rosa',2000,null,5,23)
productos.addProduct('short','blanco',1000,null,5,23)
productos.addProduct('campera','azul',0,null,0,0)
productos.addProduct('pantalon','negro',3222,null,3,20)

console.log(productos.products)

//buscar por id
console.log(productos.getProductById(6))