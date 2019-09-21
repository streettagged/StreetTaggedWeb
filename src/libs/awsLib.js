import { Storage, Auth } from "aws-amplify";
import uuidv4 from "uuidv4";

export async function s3Upload(file) {
  const { attributes: { sub } } = Auth.user;
  const filename = `${sub}-${uuidv4()}`;
  console.log(filename);
  
  const stored = await Storage.put(filename, file, {
    contentType: file.type,
    level: 'public',
  });

  return stored.key;
}

