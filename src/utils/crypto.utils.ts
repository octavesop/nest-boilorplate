import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export const generateBCryptHash = async (
  plainText: string,
  saltRounds = 12,
): Promise<string> => {
  const logger: Readonly<Logger> = new Logger(generateBCryptHash.name);
  try {
    return await bcrypt.hash(plainText, saltRounds);
  } catch (error) {
    logger.error(error);
    throw new Error('crypto failed while generate hash');
  }
};

export const generateHash = async (plainText: string): Promise<string> => {
  const logger: Readonly<Logger> = new Logger(generateHash.name);
  const defaultHashAlgorithm = 'bcrypt';
  try {
    switch (defaultHashAlgorithm) {
      case 'bcrypt':
        return await generateBCryptHash(plainText);
      default:
        throw new Error('hash algorithm is invalid');
    }
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export const compareHash = async (
  plainText: string,
  compareText: string,
): Promise<boolean> => {
  const logger: Readonly<Logger> = new Logger(compareHash.name);
  try {
    return await bcrypt.compare(plainText, compareText);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

const iv = randomBytes(16);
const key = randomBytes(32);

export const generateAESHash = (plainText: string): string => {
  const logger: Readonly<Logger> = new Logger(generateAESHash.name);
  try {
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const encryptedText = Buffer.concat([
      cipher.update(plainText),
      cipher.final(),
    ]);
    return encodeURIComponent(encryptedText.toString('base64'));
  } catch (error) {
    logger.error(error);
    throw new Error('crypto failed while generate hash');
  }
};

export const decodeAESHash = (encryptedText: string): string => {
  const base64EncodedText = Buffer.from(
    decodeURIComponent(encryptedText),
    'base64',
  );
  const logger: Readonly<Logger> = new Logger(generateAESHash.name);

  try {
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(base64EncodedText),
      decipher.final(),
    ]);
    return decryptedText.toString();
  } catch (error) {
    logger.error(error);
    throw new Error('crypto failed while generate hash');
  }
};
