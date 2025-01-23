/*
  Warnings:

  - You are about to alter the column `preco` on the `jogos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Float`.
  - You are about to alter the column `data_lanc` on the `jogos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `jogos` MODIFY `preco` FLOAT NOT NULL,
    MODIFY `data_lanc` DATETIME NOT NULL;
