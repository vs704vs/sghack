-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "owner" TEXT NOT NULL DEFAULT 'no owner',
ALTER COLUMN "desc" SET DEFAULT 'no description';
