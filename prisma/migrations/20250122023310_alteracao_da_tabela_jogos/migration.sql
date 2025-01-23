/*
  Warnings:

  - You are about to drop the column `desenvolvedor` on the `jogos` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `jogos` table. All the data in the column will be lost.
  - You are about to alter the column `data_lanc` on the `jogos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `desenvolvedorId` to the `jogos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generoId` to the `jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jogos` DROP COLUMN `desenvolvedor`,
    DROP COLUMN `genero`,
    ADD COLUMN `desenvolvedorId` INTEGER NOT NULL,
    ADD COLUMN `generoId` INTEGER NOT NULL,
    MODIFY `data_lanc` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `desenvolvedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jogos` ADD CONSTRAINT `jogos_desenvolvedorId_fkey` FOREIGN KEY (`desenvolvedorId`) REFERENCES `desenvolvedores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jogos` ADD CONSTRAINT `jogos_generoId_fkey` FOREIGN KEY (`generoId`) REFERENCES `generos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
