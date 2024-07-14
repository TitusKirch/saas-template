export default function () {
  const uploadFileByPresignedUrl = async ({
    file,
    presignedUrl,
  }: {
    file: File;
    presignedUrl: string;
  }) => {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
  };

  return {
    uploadFileByPresignedUrl,
  };
}
