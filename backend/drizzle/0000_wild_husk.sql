CREATE TABLE `cartItems` (
	`cartItemID` integer PRIMARY KEY NOT NULL,
	`cartID` integer NOT NULL,
	`productID` integer NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`cartID`) REFERENCES `shoppingCart`(`cartID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`productID`) REFERENCES `products`(`productID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orderHistory` (
	`historyID` integer PRIMARY KEY NOT NULL,
	`userID` integer NOT NULL,
	`orderID` integer NOT NULL,
	`status` text NOT NULL,
	`date` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`orderID`) REFERENCES `orders`(`orderID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`orderID` integer PRIMARY KEY NOT NULL,
	`userID` integer NOT NULL,
	`orderDate` text DEFAULT (current_timestamp) NOT NULL,
	`totalPrice` integer NOT NULL,
	`shippingAddress` text NOT NULL,
	`paymentStatus` text NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productCategories` (
	`CategoryID` integer PRIMARY KEY NOT NULL,
	`CategoryName` text,
	`Description` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`productID` integer PRIMARY KEY NOT NULL,
	`productName` text NOT NULL,
	`description` text,
	`price` numeric NOT NULL,
	`availability` integer,
	`categoryID` integer,
	FOREIGN KEY (`categoryID`) REFERENCES `productCategories`(`CategoryID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shippingAddresses` (
	`addressID` integer PRIMARY KEY NOT NULL,
	`userID` integer NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`postalCode` text NOT NULL,
	`country` text NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shoppingCart` (
	`cartID` integer PRIMARY KEY NOT NULL,
	`userID` integer NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`userID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`userID` integer PRIMARY KEY NOT NULL,
	`userName` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `productCategories` (`CategoryName`);--> statement-breakpoint
CREATE INDEX `categoryIdIndex` ON `products` (`categoryID`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailIndex` ON `users` (`email`);