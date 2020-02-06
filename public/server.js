// const app = require("express")();
// const stripe = require("stripe")("sk_test_3zLDffEABEWXc1pzEQFewm6e00xL3RkzI9");

// app.use(require("body-parser").text());


// app.post("/subscribe", function (req, res) {
//     let body = JSON.parse(req.body)
//     const stripeToken = body.token;
//     const subscriptionType = body.subscription
//     stripe.customers.create(
//         {
//         description: `${subscriptionType} Test Customer`,
//         source: stripeToken,
//         }, 
//         function(err, customer){
//             if(err){
//                 return res.send({
//                     success: false,
//                     message: "Error",
//                     body: err
//                 });
//             }
//             else {
//                 console.log("Customer", customer);
//                 const { id } = customer;
//                 stripe.subscriptions.create({
//                     customer: id,
//                     items: [
//                         {
//                             plan: subscriptionType,
//                         },
//                     ],
//                 }, function(err, subscription) {
//                     if (err){
//                         console.log("Subscription Error: ", err);
//                         return res.send({
//                             success: false,
//                             message: 'Error',
//                             body : err
//                         });
//                     }
//                     else{
//                        console.log("Subscription object: ", subscription);
//                        return res.send({
//                             success: true,
//                             message: 'Success'
//                         });
//                     }
//                 });
//             }
//         }
//     )
// });


// app.listen(9000, () => console.log("Listening on port 9000"));
