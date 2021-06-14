class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: { //search product by its name
                $regex: this.queryString.keyword,
                $options: 'i' //case insensitive
            } 
        } : {}

        this.query = this.query.find({...keyword}); //Product.find({name:'B-707 (BLUETOOTH HEADPHONE)'});
        //console.log(this)
        //console.log(keyword); { name: { '$regex': 'BLUETOOTH HEADPHONE', '$options': 'i' } }
        return this; //returns all products
    }

    filter() {
        const queryCopy = { ...this.queryString}; 
       // console.log(queryCopy); //{ keyword: 'BLUETOOTH HEADPHONE', category: 'Headphones' }

        //Removing fileds from the query
        const removeFields = ['keyword', 'limit', 'page'] //since we dont have keyword field in document, limit and page used in pagination 

        removeFields.forEach(el => delete queryCopy[el] );  //removing fields in the array 'removeFields'
        
        // console.log(queryCopy) //{ category: 'Headphones'} =>     //http://localhost:4000/products?keyword=BLUETOOTH HEADPHONE&category=Headphones

       //Filter for price and ratings
       let queryString = JSON.stringify(queryCopy);
       // console.log(queryString); //{ price: { gte: '1', lte: '2000' } } => http://localhost:4000/products?keyword=BLUETOOTH HEADPHONE&price[gte]=1&price[lte]=2000
       queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
       //console.log(queryString); //{"price":{"$gte":"1","$lte":"2000"}}  ; so handled mongo operators as each starts with $ sign

       this.query = this.query.find(JSON.parse(queryString)); //passing object { price: { '$gte': '1', '$lte': '2000' } }
       return this;

    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryString.page) || 1; //by default 1
        const skip = resPerPage*(currentPage-1); //page 2 skips first 10 products ... display 11 to 20

        this.query = this.query.limit(resPerPage).skip(skip); //limit the numbers of documents to be returned and skip for skipping results
        return this;
    }
}

module.exports = APIFeatures;