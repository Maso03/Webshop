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
CREATE UNIQUE INDEX `nameIdx` ON `productCategories` (`CategoryName`);--> statement-breakpoint
CREATE INDEX `categoryIdIndex` ON `products` (`categoryID`);