
const uploadFromBrowser = async (request, reply) => {
  console.log('Uploading files from the browser');
  try {
    const data = await request.file();

    const buffer = await data.toBuffer();
    await new Promise((resolve) => {
      cloudinary.uploader
        .upload_chunked_stream({ tags }, (error, uploadResult) => {
          if (error) {
            reply.code(500).send({ error: 'Failed to upload image' });
          } else {
            resolve(uploadResult);
            reply.send({
              url: uploadResult.secure_url,
              public_id: uploadResult.public_id,
            });
          }
        })
        .end(buffer);
    });
  } catch (error) {
    console.error(error);
  }
};