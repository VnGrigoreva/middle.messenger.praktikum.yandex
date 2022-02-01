import { Block } from '../../../../components';
import template from './template';
import { compile } from '../../../../utils';

type InfoRowPropsType = {
  label: string;
  value?: string;
  id: string;
  type?: string;
  readonly?: boolean;
  events?: any;
  error?: string;
  required?: boolean;
};

export class InfoRow extends Block<InfoRowPropsType> {
  constructor(props: InfoRowPropsType) {
    super(props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}
