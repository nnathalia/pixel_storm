-- CreateTable
CREATE TABLE `jogos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,
    `descricao` VARCHAR(500) NOT NULL,
    `preco` DECIMAL NOT NULL,
    `desenvolvedor` VARCHAR(200) NOT NULL,
    `genero` VARCHAR(100) NOT NULL,
    `data_lanc` DATETIME NOT NULL,
    `img_url` VARCHAR(500) NULL,
    `plataformaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plataformas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jogos` ADD CONSTRAINT `jogos_plataformaId_fkey` FOREIGN KEY (`plataformaId`) REFERENCES `plataformas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
