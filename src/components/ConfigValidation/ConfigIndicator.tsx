import * as React from 'react';
import { ObjectValidation } from '../../types/IstioObjects';
import { PfColors } from '../Pf/PfColors';
import { OverlayTrigger, Popover } from 'patternfly-react';
import { IconType } from '@patternfly/react-icons/dist/js/createIcon';
import { ErrorCircleOIcon, WarningTriangleIcon, CheckCircleIcon } from '@patternfly/react-icons';
import { createIcon } from '../Health/Helper';
import { style } from 'typestyle';

interface Props {
  id: string;
  validations: ObjectValidation[];
  definition?: boolean;
  size?: string;
}

export interface Validation {
  name: string;
  color: string;
  icon: IconType;
  class: string;
}

export const NOT_VALID: Validation = {
  name: 'Not Valid',
  color: PfColors.Red100,
  icon: ErrorCircleOIcon,
  class: 'health-icon'
};

export const WARNING: Validation = {
  name: 'Warning',
  color: PfColors.Gold100,
  icon: WarningTriangleIcon,
  class: 'health-icon'
};

export const VALID: Validation = {
  name: 'Valid',
  color: PfColors.Green400,
  icon: CheckCircleIcon,
  class: 'health-icon'
};

export const SMALL_SIZE = '12px';
export const MEDIUM_SIZE = '18px';
export const BIG_SIZE = '35px';
export const INHERITED_SIZE = 'inherit';

const sizeMapper = new Map<string, string>([
  ['small', SMALL_SIZE],
  ['medium', MEDIUM_SIZE],
  ['big', BIG_SIZE],
  ['inherited', INHERITED_SIZE]
]);

const tooltipListStyle = style({
  border: 0,
  padding: '0 0 0 0',
  margin: '0 0 0 0'
});

export class ConfigIndicator extends React.PureComponent<Props, {}> {
  numberOfChecks = (type: string) => {
    let numCheck = 0;
    this.props.validations.forEach(validation => {
      if (validation.checks) {
        numCheck += validation.checks.filter(i => i.severity === type).length;
      }
    });
    return numCheck;
  };

  getTypeMessage = (type: string) => {
    const numberType = this.numberOfChecks(type);
    return numberType > 0
      ? numberType > 1
        ? `${numberType} ${type}s found`
        : `${numberType} ${type} found`
      : undefined;
  };

  getValid() {
    if (this.props.validations.length === 0) {
      return WARNING;
    }
    const warnIssues = this.numberOfChecks('warning');
    const errIssues = this.numberOfChecks('error');
    return warnIssues === 0 && errIssues === 0 ? VALID : errIssues > 0 ? NOT_VALID : WARNING;
  }

  size() {
    return sizeMapper.get(this.props.size || 'inherited') || INHERITED_SIZE;
  }

  tooltipContent() {
    let numChecks = 0;
    this.props.validations.forEach(validation => {
      if (validation.checks) {
        numChecks += validation.checks.length;
      }
    });

    const issuesMessages: string[] = [];
    if (this.props.validations.length > 0) {
      if (numChecks === 0) {
        issuesMessages.push('No issues found');
      } else {
        const errMessage = this.getTypeMessage('error');
        if (errMessage) {
          issuesMessages.push(errMessage);
        }
        const warnMessage = this.getTypeMessage('warning');
        if (warnMessage) {
          issuesMessages.push(warnMessage);
        }
      }
    } else {
      issuesMessages.push('Expected validation results are missing');
    }

    const validationsInfo: JSX.Element[] = [];
    const showDefinitions = this.props.definition && numChecks !== 0;
    if (showDefinitions) {
      this.props.validations.forEach(validation => {
        validationsInfo.push(
          <div style={{ paddingLeft: '10px' }} key={validation.name}>
            {validation.name} : {validation.checks.map(check => check.message).join(',')}
          </div>
        );
      });
    }

    return (
      <Popover
        id={this.props.id + '-config-validation'}
        title={this.getValid().name}
        style={showDefinitions && { maxWidth: '80%', minWidth: '200px' }}
      >
        <div className={tooltipListStyle}>
          {issuesMessages.map(cat => (
            <div className={tooltipListStyle} key={cat}>
              {cat}
            </div>
          ))}
          {validationsInfo}
        </div>
      </Popover>
    );
  }

  render() {
    return (
      <span>
        <OverlayTrigger
          placement={'right'}
          overlay={this.tooltipContent()}
          trigger={['hover', 'focus']}
          rootClose={false}
        >
          <span style={{ color: this.getValid().color }}>{createIcon(this.getValid(), 'sm')}</span>
        </OverlayTrigger>
      </span>
    );
  }
}
