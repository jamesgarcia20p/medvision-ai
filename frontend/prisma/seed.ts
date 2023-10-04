import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@medvision.ai" },
    update: {},
    create: { clerkId: "demo_clerk_user", email: "demo@medvision.ai", name: "Demo Radiologist" }
  });
  const studies = [
    ["Avery Chen", "MRN-1001", "CT", "Chest", "completed", 94, 12.8, 4],
    ["Morgan Patel", "MRN-1002", "MRI", "Brain", "review", 88, 6.4, 6],
    ["Riley Johnson", "MRN-1003", "CT", "Abdomen", "processing", 61, 0, 3]
  ] as const;
  for (const [patientName, patientMrn, modality, bodyPart, status, aiConfidence, tumorVolumeMl, seriesCount] of studies) {
    const study = await prisma.study.create({ data: { patientName, patientMrn, modality, bodyPart, status, aiConfidence, tumorVolumeMl, seriesCount, studyDate: new Date(), ownerId: user.id } });
    await prisma.series.create({ data: { studyId: study.id, description: `${bodyPart} ${modality} axial`, storageKey: `demo/${study.id}/series-1`, instanceCount: 128 } });
    await prisma.report.create({ data: { studyId: study.id, summary: `AI-assisted review for ${patientName} identifies findings requiring radiologist confirmation.`, impression: ["Segmentation mask generated for suspected lesion.", "No acute workflow errors detected.", "Recommend clinician review before diagnostic use."] } });
  }
}

main().finally(async () => prisma.$disconnect());
