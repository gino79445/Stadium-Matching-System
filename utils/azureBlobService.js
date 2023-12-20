// azureBlobService.js
const { BlobServiceClient } = require('@azure/storage-blob');

const sasUrl = 'https://stadiumafab3efe.blob.core.windows.net/images?sp=racwdli&st=2023-12-20T08:27:30Z&se=2024-11-30T16:27:30Z&spr=https&sv=2022-11-02&sr=c&sig=Y9rVIdPsomRdmMj1ukC1SkxlxXNgjB33QN93I5IWhZo%3D';
const blobServiceClient = new BlobServiceClient(sasUrl);
const containerName = 'images'; // Your container name

async function uploadBlob(fileBuffer, blobName) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    return blockBlobClient.url;
}
module.exports = { uploadBlob };
