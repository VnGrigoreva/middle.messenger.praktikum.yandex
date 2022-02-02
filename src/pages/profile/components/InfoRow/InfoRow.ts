import { Block } from '../../../../components';
import template from './template';
import { compile } from '../../../../utils';
import { EventsType } from '../../../../types';

type InfoRowPropsType = {
  label: string;
  value?: string;
  id: string;
  type?: string;
  readonly?: boolean;
  events?: EventsType;
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
