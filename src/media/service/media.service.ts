import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { randomUUID } from 'crypto';
@Injectable()
export class MediaService {
  s3region: string;
  s3accessKey: string;
  s3secretKey: string;
  s3bucketName: string;
  baseURI: string;

  constructor() {
    this.s3region = 'ap-southeast-1';
    this.s3accessKey = 'AKIATKCJQB6J6W2W5MHP';
    this.s3secretKey = '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';
    this.s3bucketName = 'nftmarketplace123';
    this.baseURI = 'https://dev-cdn.megacy.io/';
  }

  getLinkMediaKey(media_key) {
    const s3 = this.getS3();
    return s3.getSignedUrl('getObject', {
      Key: media_key,
      Bucket: this.s3bucketName,
      Expires: 60 * 60 * 12,
    });
  }

  getPresignedPutUrly(file_name: string) {
    const key = `image/${randomUUID()}_${file_name}`;
    const s3 = this.getS3();
    const expirationTimeInSeconds = 3600;

    const url = s3.getSignedUrl('putObject', {
      Bucket: this.s3bucketName,
      Key: key,
      Expires: expirationTimeInSeconds,
      ACL: 'private',
      ContentType: 'application/octet-stream',
    });

    return {
      put_object_url: url,
      download_url: `https://${this.baseURI}/${key}`,
      s3_key: key,
    };
  }

  // async updateACL(media_id) {
  //   const media = await this.mediaFileRepository.findOneBy(media_id);
  //   const s3 = this.getS3();
  //   s3.putObjectAcl(
  //     {
  //       Bucket: this.publicBucketName,
  //       Key: media.key,
  //       ACL: 'public-read',
  //     },
  //     // eslint-disable-next-line @typescript-eslint/no-empty-function
  //     (err, data) => {},
  //   );
  //   return (
  //     s3.endpoint.protocol +
  //     '//' +
  //     this.publicBucketName +
  //     '.' +
  //     s3.endpoint.hostname +
  //     '/' +
  //     media.key
  //   );
  // }
  async getObject(pathname: string) {
    const s3 = this.getS3();

    const listAllKeys = (params: any, out = { s3Data: {} }) =>
      new Promise((resolve, reject) => {
        s3.listObjectsV2(params)
          .promise()
          .then(
            ({
              Contents,
              CommonPrefixes,
              IsTruncated,
              NextContinuationToken,
            }) => {
              out.s3Data = {
                folders: [...CommonPrefixes],
                contents: [...Contents],
              };
              !IsTruncated
                ? resolve(out)
                : resolve(
                    listAllKeys(
                      Object.assign(params, {
                        ContinuationToken: NextContinuationToken,
                      }),
                      out,
                    ),
                  );
            },
          )
          .catch(reject);
      });

    return listAllKeys({
      Bucket: this.s3bucketName,
      Prefix: `${
        pathname.trim() === ''
          ? pathname.trim()
          : pathname.replace('/', '').trim()
      }`,
      Delimiter: '/',
    });
  }

  async newFolderS3(pathname): Promise<any> {
    const s3 = this.getS3();

    const params = {
      Bucket: this.s3bucketName,
      Key: pathname + '/',
      Body: '',
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }

        resolve(data);
      });
    });
  }

  async uploadFileS3(
    file_buffer: Buffer,
    pathname: string,
    content_type: string,
  ): Promise<any> {
    const s3 = this.getS3();

    const params = {
      Bucket: this.s3bucketName,
      Key: pathname,
      Body: file_buffer,
      ContentType: content_type,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }

        resolve(data);
      });
    });
  }

  async deleteOneFileS3(pathname: string) {
    // const media = await this.mediaFileRepository.findOneBy(media_id);
    const s3 = this.getS3();

    const params = {
      Bucket: this.s3bucketName,
      Key: pathname,
    };

    s3.deleteObject(params, function (err) {
      if (err) console.log(err, err.stack);
      else return 1;
    });
    return true;
  }

  async deleteFolder(bucket, dir) {
    const s3 = this.getS3();
    const deleteObjectsParams = {
      Bucket: bucket,
      Delete: {
        Objects: [],
        Quiet: false,
      },
    };

    s3.listObjects({ Bucket: bucket, Prefix: dir }, (err, data) => {
      if (err) {
        console.log('Error listing objects in the folder:', err);
        return;
      }

      if (data.Contents.length === 0) {
        console.log('The folder is already empty.');
        return;
      }

      deleteObjectsParams.Delete.Objects = data.Contents.map(({ Key }) => ({
        Key,
      }));

      s3.deleteObjects(deleteObjectsParams, (err, data) => {
        if (err) {
          console.log('Error deleting objects:', err);
          return;
        }
      });
    });
    const deleteFolderParams = {
      Bucket: bucket,
      Key: dir,
    };

    s3.deleteObject(deleteFolderParams, (err, data) => {
      if (err) {
        console.log('Error deleting the folder:', err);
        return;
      }
    });
  }

  async deleteFilesS3(params) {
    // const media = await this.mediaFileRepository.findOneBy(media_id);
    const s3 = this.getS3();
    // s3.deleteObjects(params, function (err) {
    //   if (err) console.log(err, err.stack);
    //   else return 1;
    // });
    // return true;
    s3.listObjects(params, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const objects = data.Contents.map((object) => ({ Key: object.Key }));

      const deleteParams = {
        Bucket: this.s3bucketName,
        Delete: {
          Objects: objects,
        },
      };

      s3.deleteObjects(deleteParams, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  }

  async uploadS3(file_buffer, key, content_type) {
    const s3 = this.getS3();

    const params = {
      Bucket: this.s3bucketName,
      Key: key,
      Body: file_buffer,
      ContentType: content_type,
      // ACL: 'public-read',
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }

        resolve(data);
      });
    });
  }

  async deleteFileS3(params) {
    // const media = await this.mediaFileRepository.findOneBy(media_id);
    const s3 = this.getS3();

    s3.deleteObjects(params, function (err) {
      if (err) console.log(err, err.stack);
      else return 1;
    });
    // await this.mediaFileRepository.delete(media_id);
    return true;
  }

  private slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from =
      'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;';

    const to =
      'AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------';

    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  private getS3() {
    return new S3({
      region: this.s3region,
      accessKeyId: this.s3accessKey,
      secretAccessKey: this.s3secretKey,
    });
  }

  private getFullS3() {
    return new S3({
      endpoint: this.baseURI,
      s3BucketEndpoint: true,
      region: this.s3region,
      accessKeyId: this.s3accessKey,
      secretAccessKey: this.s3secretKey,
      signatureVersion: 'v4',
    });
  }

  private async createFolderS3(key: string) {
    const s3 = this.getS3();

    const params = {
      Bucket: this.s3bucketName,
      Key: key,
      //   ACL: 'public-read', // comment if private file
    };

    return new Promise((resolve, reject) => {
      s3.putObject(params, (err, data) => {
        if (err) {
          reject(err.message);
        }

        resolve(data);
      });
    });
  }

  async createFolder(folderName: string, pathname: string) {
    const key = `${
      pathname === '/' ? '' : pathname.replace('/', '')
    }${folderName.trim()}`;

    await this.createFolderS3(key);
    return {
      folderName: folderName,
      pathname: pathname,
    };
  }

  /**
   * Xóa folder trên S3
   * Check kỹ truyền đúng Key, xóa đi không trở lại
   * @param dir           {string}     đường dẫn đến folder theo Key trên S3, kết thúc bằng "/", vd: "launchpad/12/preview-img/"
   * @param excludeKeys   {string[]}   các Key của file muốn bỏ qua không xóa
   * @returns
   */
  async emptyS3Directory(dir: string, excludeKeys?: string[]) {
    if (!dir || dir === '' || dir === '/') {
      throw new BadRequestException('Invalid dir');
    }

    const s3 = this.getS3();
    const bucket = this.s3bucketName;
    const listParams = {
      Bucket: bucket,
      Prefix: dir,
    };
    const deleteKeys = [];
    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    listedObjects.Contents.forEach(({ Key }) => {
      if (excludeKeys?.length > 0) {
        if (!excludeKeys.includes(Key)) {
          deleteKeys.push({ Key });
        }
      } else {
        deleteKeys.push({ Key });
      }
    });

    if (deleteKeys?.length > 0) {
      const deleteParams = {
        Bucket: bucket,
        Delete: { Objects: deleteKeys },
      };

      const result = await s3.deleteObjects(deleteParams).promise();

      console.log('--------------------');
      Logger.log('Deleted S3 objects:');
      console.log({ Bucket: bucket });
      console.log(result);
      console.log('--------------------');
    }

    if (listedObjects.IsTruncated) {
      await this.emptyS3Directory(dir);
    }
  }
}
