-- CreateTable
CREATE TABLE `ClassDetails` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `professor` VARCHAR(191) NOT NULL,
    `tooltip` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `syllabus` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClassDetails` ADD CONSTRAINT `ClassDetails_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
