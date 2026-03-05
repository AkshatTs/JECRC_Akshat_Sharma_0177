Question
1
JavaScript Events
Description
Task 1: E-Commerce Add to Cart Button
Scenario:
In an online shopping website, when a user clicks Add to Cart, the product should be added to the cart and a message displayed.

Requirement

Use click event

Display product name in console

Show message in UI

<button id="addCart">Add to Cart</button>
<p id="msg"></p>

<script>
document.getElementById("addCart").addEventListener("click", function(){

    console.log("Product added to cart");

    document.getElementById("msg").innerHTML =
    "Item successfully added to cart";

});
</script>



Question
2
Login Form Keyboard Event
Description
Login Form Keyboard Event
Scenario:
When the user presses Enter, the login form should submit.

Requirement

Use keydown

<input type="text" id="username" placeholder="Enter username">

<script>

document.getElementById("username").addEventListener("keydown", function(e){

if(e.key === "Enter"){

console.log("Login attempt triggered");

alert("Submitting login form");

}

});

</script>



Question
3
Secure Banking App Right Click Disable
Description
Secure Banking App Right Click Disable
Scenario:
A banking application disables right-click to protect sensitive information.

Requirement

Use contextmenu

Prevent default behavior

document.addEventListener("contextmenu", function(e){

e.preventDefault();

console.warn("Right click disabled for security");

});



Question
4
Customer Support Chat Mouse Hover
Description
Customer Support Chat Mouse Hover
Scenario:
A chat icon shows tooltip when mouse hovers over it.

Requirement

Use mouseover

Display message

<div id="chatIcon">💬 Chat Support</div>
<p id="info"></p>

<script>

document.getElementById("chatIcon").addEventListener("mouseover", function(){

    document.getElementById("info").innerText =
    "Click here to talk with customer support";

    console.log("Mouse hovered over chat icon");

});

</script>


Question
5
Website Double Click to Like Product
Description
Scenario:
In many apps (Instagram, shopping apps), double-clicking a product image likes the product.

Requirement

Use dblclick

Increase like counter

<img id="product" src="https://via.placeholder.com/200">
<p>Likes: <span id="count">0</span></p>

<script>
let likes = 0;

document.getElementById("product").addEventListener("dblclick", function(){

    likes++;

    document.getElementById("count").innerText = likes;

    console.log("Product liked", likes);

});
</script>