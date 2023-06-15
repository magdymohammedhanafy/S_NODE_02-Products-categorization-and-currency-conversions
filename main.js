

const getEgpCurrency = async () => {
   let currencies = await fetch("https://openexchangerates.org/api/latest.json?app_id=4fb54a06490f4d09a8bf0049e7b9d7eb");
   currencies=await currencies.json();
   return currencies.rates.EGP;

}
const getData=async function(){
   //get egyptian convertion
   let transEgpCurrency=await getEgpCurrency();   
    try 
    {
      //fetch data from api
       let data = await fetch('https://api.escuelajs.co/api/v1/products') ;
       data=await data.json();
       //extract categories id 
       let categoryId =[];
       data.forEach(e => {
       categoryId.push(e.category.id); 
       });
       //sorting categories id
       categoryId.sort(function(a,b){
         return a - b;
       }) 
       //extract unique id 
       let categoryUniqueId=new Set(categoryId);
       categoryUniqueId=[...categoryUniqueId];
      
       // Categorize the list products into a different buckets according to the product category
       let finallArray=[];
       categoryUniqueId.forEach(function(a,i)  {
       let obj=
       {
         "category":
         {
            "id": a  
         },
         "products":[]
       };
       data 
       data.forEach(b=> {
         if(a===b.category.id)
         {
           obj.category.name=b.category.name;
           let obj2=
           {
            "id": b.id,
            "title": b.title,
            "price": b.price*transEgpCurrency +`$`,
            "description": b.description,
            "category": 
            {
               "id": b.category.id,
               "name": b.category.name,
               "image": b.category.image
            }
         }
           obj.products.push(obj2);
         } 
       })
       finallArray.push(obj);   
      });
      console.log(finallArray); 
    } 
    catch (error) 
    {
    console.log(error);
    }
  }

  //calling main function
  getData();




   
    


   


 
  
 



