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
	`userID` text NOT NULL,
	`orderID` integer NOT NULL,
	`status` text,
	`date` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`orderID`) REFERENCES `orders`(`ordersID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`ordersID` integer PRIMARY KEY NOT NULL,
	`userID` text NOT NULL,
	`cartID` integer NOT NULL,
	`shippingAddress` integer NOT NULL,
	`totalPrice` integer NOT NULL,
	`products` text,
	`orderDate` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`cartID`) REFERENCES `shoppingCart`(`cartID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`shippingAddress`) REFERENCES `shippingAddresses`(`addressID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productCategories` (
	`CategoryID` integer PRIMARY KEY NOT NULL,
	`CategoryName` text NOT NULL,
	`Description` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`productID` integer PRIMARY KEY NOT NULL,
	`productName` text NOT NULL,
	`description` text,
	`price` numeric NOT NULL,
	`availability` integer,
	`categoryID` integer NOT NULL,
	`image` blob,
	FOREIGN KEY (`categoryID`) REFERENCES `productCategories`(`CategoryID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shippingAddresses` (
	`addressID` integer PRIMARY KEY NOT NULL,
	`userID` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`postalCode` text NOT NULL,
	`country` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `shoppingCart` (
	`cartID` integer PRIMARY KEY NOT NULL,
	`userID` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`userID` text PRIMARY KEY NOT NULL,
	`userName` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `cartIdIndex1` ON `cartItems` (`cartID`);--> statement-breakpoint
CREATE INDEX `productIdIndex1` ON `cartItems` (`productID`);--> statement-breakpoint
CREATE INDEX `userIdIndex5` ON `orderHistory` (`userID`);--> statement-breakpoint
CREATE INDEX `orderPositionIdIndex1` ON `orderHistory` (`orderID`);--> statement-breakpoint
CREATE INDEX `orderIdIndex2` ON `orders` (`cartID`);--> statement-breakpoint
CREATE INDEX `userIdIndex4` ON `orders` (`userID`);--> statement-breakpoint
CREATE INDEX `addressIdIndex1` ON `orders` (`shippingAddress`);--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `productCategories` (`CategoryName`);--> statement-breakpoint
CREATE INDEX `categoryIdIndex` ON `products` (`categoryID`);--> statement-breakpoint
CREATE INDEX `userIdIndex2` ON `shippingAddresses` (`userID`);--> statement-breakpoint
CREATE INDEX `userIdIndex3` ON `shoppingCart` (`userID`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailIndex` ON `users` (`email`);