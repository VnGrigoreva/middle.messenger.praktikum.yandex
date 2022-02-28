import {Indexed} from '../types';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const key in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(key)) {
      continue;
    }

    try {
      if (rhs[key].constructor === Object) {
        merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        lhs[key] = rhs[key];
      }
    } catch {
      lhs[key] = rhs[key];
    }
  }
  return lhs;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== 'string') {
    return 'path must be string';
  } else {
    if (typeof object !== 'object') {
      return object;
    } else {
      const forMerge = path
        .split('.')
        .reduceRight<Indexed>((acc: any, e: any) => {
          return {[e]: acc || value};
        }, value as any);
      return merge(object as Indexed, forMerge);
    }
  }
}
