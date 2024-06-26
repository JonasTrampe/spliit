/*
  Warnings:

  - You are about to drop the column `paidById` on the `Expense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_paidById_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "paidById";

-- CreateTable
CREATE TABLE "ExpensePaidBy" (
    "expenseId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "ExpensePaidBy_pkey" PRIMARY KEY ("expenseId","participantId")
);

-- AddForeignKey
ALTER TABLE "ExpensePaidBy" ADD CONSTRAINT "ExpensePaidBy_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpensePaidBy" ADD CONSTRAINT "ExpensePaidBy_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
