-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "narrationId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Narration" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnsweredQuestionsOnPlayer" (
    "questionId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "SeenNarrationsOnPlayer" (
    "questionId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "classId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassToNarration" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer.text_unique" ON "Answer"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_narrationId_unique" ON "Answer"("narrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Narration.text_unique" ON "Narration"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Class.name_unique" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AnsweredQuestionsOnPlayer.playerId_questionId_unique" ON "AnsweredQuestionsOnPlayer"("playerId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "SeenNarrationsOnPlayer.playerId_questionId_unique" ON "SeenNarrationsOnPlayer"("playerId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Player.email_unique" ON "Player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Player.name_unique" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToNarration_AB_unique" ON "_ClassToNarration"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToNarration_B_index" ON "_ClassToNarration"("B");

-- AddForeignKey
ALTER TABLE "Answer" ADD FOREIGN KEY ("narrationId") REFERENCES "Narration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnsweredQuestionsOnPlayer" ADD FOREIGN KEY ("questionId") REFERENCES "Narration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnsweredQuestionsOnPlayer" ADD FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenNarrationsOnPlayer" ADD FOREIGN KEY ("questionId") REFERENCES "Narration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeenNarrationsOnPlayer" ADD FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToNarration" ADD FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToNarration" ADD FOREIGN KEY ("B") REFERENCES "Narration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
