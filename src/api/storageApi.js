import { Storage } from 'aws-amplify';

export class StorageApi {
  static async s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`;
    const stored = await Storage.vault.put(filename, file, {
      contentType: file.type,
    });

    return stored.key;
  }
}
