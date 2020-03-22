Title
The Survival App

Features, functions, and goals
Shop for surivival items. 
Save them to your inventory.

Component Hierarchy
https://imgur.com/a/nVqtDq7

Wireframe
https://imgur.com/a/uvl43Pg

API Endpoints
MVP
/api/items
api/items/:id
api/order
api/order/:id

Post-MVP
api/inventory
api/inventory/:id

MVP
Shop for surivival items. 

Post MVP
Save survival items to your inventory.

ERD
Shopping Cart ERD - Client
A. Items
B. Item
+Id
+Name
+Description
+Price
+Qty

Business Data - Persistent
1 - User
+Id number
+Email
+PasswordDigest

  An order will have at least one item order
  An order line will be linked to exactly one order

2 - Order
+Id number
+Date
+UserId
+Address information - Optional for Post MVP

3 - OrderLine - Basically one product that is in a cart
+Id number
+OrderId
+ItemID
+Qty
+Price

4 - Item - Basically one item anywhere
+Id number
+Name string
+Description string
+Price number
+Img string