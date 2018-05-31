import * as React from 'react';
import { Col, Row } from 'patternfly-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { NamespaceFilterSelected } from '../../components/NamespaceFilter/NamespaceFilter';
import { ActiveFilter } from '../../types/NamespaceFilter';
import { aceOptions, IstioConfigDetails, IstioConfigId, safeDumpOptions } from '../../types/IstioConfigDetails';
import { dicIstioType } from '../../types/IstioConfigListComponent';
import * as MessageCenter from '../../utils/MessageCenter';
import * as API from '../../services/Api';
import IstioRuleInfo from './IstioRuleInfo';
import AceEditor from 'react-ace';
import 'brace/mode/yaml';
import 'brace/theme/eclipse';
import { authentication } from '../../utils/Authentication';

const yaml = require('js-yaml');

interface IstioConfigDetailsState {
  istioObjectDetails?: IstioConfigDetails;
}

class IstioConfigDetailsPage extends React.Component<RouteComponentProps<IstioConfigId>, IstioConfigDetailsState> {
  constructor(props: RouteComponentProps<IstioConfigId>) {
    super(props);
    this.state = {};
  }

  updateFilters = (addObjectTypeFilter: boolean) => {
    let activeFilters: ActiveFilter[] = [];
    let namespaceFilter: ActiveFilter = {
      label: 'Namespace: ' + this.props.match.params.namespace,
      category: 'Namespace',
      value: this.props.match.params.namespace.toString()
    };
    activeFilters.push(namespaceFilter);
    if (addObjectTypeFilter) {
      let objectTypeFilter: ActiveFilter = {
        label: 'Istio Type: ' + dicIstioType[this.props.match.params.objectType],
        category: 'Istio Type',
        value: dicIstioType[this.props.match.params.objectType]
      };
      activeFilters.push(objectTypeFilter);
    }
    NamespaceFilterSelected.setSelected(activeFilters);
  };

  updateNamespaceFilter = () => this.updateFilters(false);

  updateTypeFilter = () => this.updateFilters(true);

  fetchIstioObjectDetails = (props: IstioConfigId) => {
    API.getIstioConfigDetail(authentication(), props.namespace, props.objectType, props.object)
      .then(response => {
        this.setState({
          istioObjectDetails: response.data
        });
      })
      .catch(error => {
        MessageCenter.add(API.getErrorMsg('Could not fetch IstioConfig details.', error));
      });
  };

  componentDidMount() {
    this.fetchIstioObjectDetails(this.props.match.params);
  }

  componentWillReceiveProps(nextProps: RouteComponentProps<IstioConfigId>) {
    this.fetchIstioObjectDetails(nextProps.match.params);
  }

  renderEditor(routingObject: any) {
    return (
      <div className="container-fluid container-cards-pf">
        <Row className="row-cards-pf">
          <Col>
            <h1>{this.props.match.params.objectType + ': ' + this.props.match.params.object}</h1>
            <AceEditor
              mode="yaml"
              theme="eclipse"
              readOnly={true}
              width={'100%'}
              height={'50vh'}
              className={'istio-ace-editor'}
              setOptions={aceOptions}
              value={yaml.safeDump(routingObject, safeDumpOptions)}
            />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid container-pf-nav-pf-vertical">
        <div className="page-header">
          <h2>
            Istio Config{' '}
            <Link to="/istio" onClick={this.updateNamespaceFilter}>
              {this.props.match.params.namespace}
            </Link>{' '}
            /{' '}
            <Link to="/istio" onClick={this.updateTypeFilter}>
              {this.props.match.params.objectType}
            </Link>{' '}
            / {this.props.match.params.object}
          </h2>
        </div>
        {this.state.istioObjectDetails && this.state.istioObjectDetails.routeRule
          ? this.renderEditor(this.state.istioObjectDetails.routeRule)
          : undefined}
        {this.state.istioObjectDetails && this.state.istioObjectDetails.destinationPolicy
          ? this.renderEditor(this.state.istioObjectDetails.destinationPolicy)
          : undefined}
        {this.state.istioObjectDetails && this.state.istioObjectDetails.virtualService
          ? this.renderEditor(this.state.istioObjectDetails.virtualService)
          : undefined}
        {this.state.istioObjectDetails && this.state.istioObjectDetails.destinationRule
          ? this.renderEditor(this.state.istioObjectDetails.destinationRule)
          : undefined}
        {this.state.istioObjectDetails && this.state.istioObjectDetails.rule ? (
          <IstioRuleInfo
            namespace={this.state.istioObjectDetails.namespace.name}
            rule={this.state.istioObjectDetails.rule}
            search={this.props.location.search}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default IstioConfigDetailsPage;