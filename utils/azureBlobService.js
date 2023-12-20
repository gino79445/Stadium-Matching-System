// azureBlobService.js
const { BlobServiceClient } = require('@azure/storage-blob');

const sasUrl = 'https://stadiumafab3efe.blob.core.windows.net/images?sp=racwdli&st=2023-12-19T17:08:25Z&se=2023-12-20T01:08:25Z&sv=2022-11-02&sr=c&sig=RG2Rx5IzMKogG8DaCLuS1WahHk0e7GjYBofzOmGzWzM%3D';
const blobServiceClient = new BlobServiceClient(sasUrl);
const containerName = 'images'; // Your container name

async function uploadBlob(fileBuffer, blobName) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(fileBuffer, fileBuffer.length);
    return blockBlobClient.url;
}

module.exports = { uploadBlob };
