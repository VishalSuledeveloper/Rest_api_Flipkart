//Page1

#List of product
http://localhost:9870/product

#List of brands
http://localhost:9870/brand

#brand wrt product
http://localhost:9870/brand?category_id=1

#quickSearch
http://localhost:9870/ProductType


//Page2
#product wrt brand
http://localhost:9870/product?brandID=2

#product wrt cost and brand
http://localhost:9870/filter/5?brandID=5
http://localhost:9870/filter/4?lcost=500&hcost=20000&brandID=4

#Sort on basis of cost
http://localhost:9870/filter/1?brandID=1&sort=-1

//Page 3

#details of the product
http://localhost:9870/details/62da70ac7627463d23f62907
http://localhost:9870/details/1

//Products on the basis of product_type
http://localhost:9870/PType/1

//Page 4
#Product Details
(POST)localhost:9870/productslist

{"id":[1,2,3]}

#place order 
(POST) localhost:9870/placeOrder
    {
        "orderId":5,
        "name": "Ashvini",
        "email": "ashvini@gmail.com",
        "address": "Hno 24,Sector 1",
        "phone": 922888082,
        "cost": 18000,
        "product":"Redmi Mobile",
        "status": "delivered"
    }

//Page5
#List of order Placed
(GET)https://localhost:9870/orders

#List of order place wrt email
https://localhost:9870/orders?email=ashvini@gmail.com

#update order details with payment 
(PUT) https://localhost:9870/updateOrder/2

{
                "status":"TXN_SUCCESS",
                "bank_name":"HDFC",
                "date":"12/05/2022"
}



#Delete Order
https://localhost:9870/deleteOrder/62daa3efad1beceec36ca360