import * as aws from "aws-sdk";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.S3_BUCKET;

if (!accessKeyId || !secretAccessKey || !bucket) {
    throw Error("Could not find AWS credentials");
}

aws.config.update({accessKeyId, secretAccessKey});

export async function uploadFile(fileKey: string, buffer: Buffer) {
    const s3 = new aws.S3();
    return s3.upload({
        Bucket: bucket,
        Key: fileKey,
        Body: buffer,
        ACL: "public-read",
        ContentType: "application/pdf",
    }).promise();
}

export async function deleteFile(fileKey: string) {
    const s3 = new aws.S3();
    return s3.deleteObject({
        Bucket: bucket,
        Key: fileKey,
    }).promise();
}

export function getCvFileKeyForUser(userId: number) {
    return `cv-${userId}.pdf`;
}
