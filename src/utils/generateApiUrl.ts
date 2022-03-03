import config from './config';
import {trimSlashes} from './trim';

export const generateApiUrl = (
  uri: string,
  apiVersion?: number,
  apiPrefix?: string
): string => {
  return `${trimSlashes(config.apiBasePath)}/${trimSlashes(
    apiPrefix || config.apiPrefix
  )}/v${apiVersion || config.apiVersion}/${trimSlashes(uri)}`;
};
