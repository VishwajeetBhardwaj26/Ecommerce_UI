const axios= require("axios");

 export let response=axios.get("http://localhost:3001/api/products/getProducts")

// export const sliderItems = [
//     {
//       id: 1,
//       img: "https://images.pexels.com/photos/364822/rolex-watch-time-luxury-364822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//       title: "SUMMER SALE",
//       desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
//       bg: "f5fafd",
//     },
//     {
//       id: 2,
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHvQ99pEu71X_c1cQBUI0J8oS7GQZ21DUeeQ&usqp=CAU",
//       title: "AUTUMN COLLECTION",
//       desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
//       bg: "fcf1ed",
//     },
//     {
//       id: 3,
//       img: "https://images.pexels.com/photos/364822/rolex-watch-time-luxury-364822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//       title: "LOUNGEWEAR LOVE",
//       desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
//       bg: "fbf0f4",
//     },
//   ];
