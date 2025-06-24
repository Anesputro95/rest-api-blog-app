-- Tambah kolom accountId tapi belum NOT NULL
ALTER TABLE "Article" ADD COLUMN "accountId" INTEGER;

-- SET nilai default (misalnya id = 1), pastikan id itu ada di tabel Account
UPDATE "Article" SET "accountId" = 1;

-- Baru set kolom jadi NOT NULL
ALTER TABLE "Article" ALTER COLUMN "accountId" SET NOT NULL;

-- Tambahkan foreign key constraint
ALTER TABLE "Article"
ADD CONSTRAINT "Article_accountId_fkey"
FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
